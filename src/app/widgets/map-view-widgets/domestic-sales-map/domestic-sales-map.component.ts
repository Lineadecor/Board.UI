import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MapService } from 'src/app/@core/services/map.service';
import  * as L  from "leaflet";

@Component({
  selector: 'app-domestic-sales-map',
  templateUrl: './domestic-sales-map.component.html',
  styleUrls: ['./domestic-sales-map.component.scss'],
  providers:[MapService]
})
export class DomesticSalesMapComponent {
  @Input() countryId: string;

  @Output() selectEvent: EventEmitter<any> = new EventEmitter();

  layers = [];
  currentTheme: any;
  alive = true;
  selectedRegion;

  options = {
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    zoomDelta: 0.25,
    zoom: 5.5,
    minZoom: 2,
    maxZoom: 10,
    zoomControl: false,
    center: L.latLng({ lat: 39, lng: 35.5}),
    maxBounds: new L.LatLngBounds(
      new L.LatLng(-89.98155760646617, -180),
      new L.LatLng(89.99346179538875, 180),
    ),
    maxBoundsViscosity: 1.0,
  };

  constructor(private ecMapService: MapService) {


    this.ecMapService.getCords()
      .pipe(takeWhile(() => this.alive))
      .subscribe((cords: any) => {

        this.layers = [this.createGeoJsonLayer(cords)];
        this.selectFeature(this.findFeatureLayerByCountryId(this.countryId));
      });
  }


  mapReady(map: L.Map) {
    // map.addControl(L.control.zoom({ position: 'bottomright' }));
    // fix the map fully displaying, existing leaflet bag
    map.addLayer(new L.TileLayer("https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=90bfe7bb6284443a89fca72f2e3a2385"));
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  private createGeoJsonLayer(cords) {
    return L.geoJSON(
      cords as any,
      {
        style: () => ({
          weight: 2,
          fillColor: "lightblue",
          fillOpacity: 1,
          color: "darkgray",
          opacity: 1,
        }),
        onEachFeature: (f, l) => {
          // l.bindPopup(f.properties.name);
          this.onEachFeature(f, l);
        },
      });
  }

  private onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => this.highlightFeature(e.target),
      mouseout: (e) => this.moveout(e.target),
      click: (e) => this.selectFeature(e.target),
    });
  }

  private highlightFeature(featureLayer) {
    if (featureLayer) {
      // featureLayer.openPopup();
      featureLayer.setStyle({
        weight: 3,
        fillColor: "#BBDFFF",
        color: "blue",
      });

      if (!L.Browser.ie && !L.Browser.opera12 && !L.Browser.edge) {
        featureLayer.bringToFront();
      }
    }
  }

  private moveout(featureLayer) {
    if (featureLayer !== this.selectedRegion) {
      this.resetHighlight(featureLayer);

      // When countries have common border we should highlight selected country once again
      this.highlightFeature(this.selectedRegion);
    }
  }

  private resetHighlight(featureLayer) {
    if (featureLayer) {
      const geoJsonLayer = this.layers[0];

      geoJsonLayer.resetStyle(featureLayer);
    }
  }

  private selectFeature(featureLayer) {
    if (featureLayer !== this.selectedRegion) {
      this.resetHighlight(this.selectedRegion);
      this.highlightFeature(featureLayer);
      this.selectedRegion = featureLayer;
      if(featureLayer !==null){
        this.selectEvent.emit(featureLayer.feature.properties.name);
      }
    }
  }

  private findFeatureLayerByCountryId(id) {
    const layers = this.layers[0].getLayers();
    const featureLayer = layers.find(item => {
      return item.feature.id === id;
    });

    return featureLayer ? featureLayer : null;
  }
}
