import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MapService } from 'src/app/@core/services/map.service';
import  * as L  from "leaflet";
import { SalesChannelService } from 'src/app/@core/services/sales-channel.service';
import { SalesAgentRegionDetailDto } from 'src/app/@core/data/dtos/sales-agents-region-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-domestic-sales-map',
  templateUrl: './domestic-sales-map.component.html',
  styleUrls: ['./domestic-sales-map.component.scss'],
  providers:[MapService, CurrencyPipe]
})
export class DomesticSalesMapComponent {

  @Output() selectEvent: EventEmitter<any> = new EventEmitter();

  layers = [];
  currentTheme: any;
  alive = true;
  selectedRegion;
  tableData: SalesAgentRegionDetailDto[];

  public mainFilter :DefaultFilter= new DefaultFilter();

  selectedData: SalesAgentRegionDetailDto[];

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

  constructor(
    private ecMapService: MapService,
    private salesChannelService: SalesChannelService,
    private currencyPipe: CurrencyPipe,
    private mainFilterService: MainFilterService) {
      this.mainFilterService.mainFilter$.subscribe(data=> {
        this.mainFilter=data;
       });

       this.salesChannelService.GetSalesAgentRegionDetailAsync({
        year: this.mainFilter.year,
        months: this.mainFilter.listMonths.join(","),
        salesOrganisation: "1100",
        currency: this.mainFilter.currency,
        region: "All"
      }).subscribe(data=> {
        if (data.isSuccess) {
          this.tableData = data.results;
          this.selectFeature(this.findFeatureLayerByRegionId("Istanbul"));
         
        } else {
          console.error("Data alınamadı");
        }

      });

      this.ecMapService.getCords()
      .pipe(takeWhile(() => this.alive))
      .subscribe((cords: any) => {

        this.layers = [this.createGeoJsonLayer(cords)];
        
      });

      
  }


private getSalesAgents()
{
  if(this.selectedRegion){
   this.selectedData = this.tableData.filter(val => val.bolge === this.selectedRegion.feature.properties.name); 
  }
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
          var featureData =  this.tableData?.filter(val => val.bolge === f.properties.name);
          var totalAmount =0;
          if(featureData.length>0){
            totalAmount = featureData.map(x => x.netTutar).reduce((a, b) => { return a + b; });
          }
          l.bindPopup("<b>" + f.properties.name + "</b><br/> Toplam: " 
          + this.currencyPipe.transform(totalAmount, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')
          + "<br/>" + featureData.length + " Bayi");
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
       featureLayer.openPopup();
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
      this.getSalesAgents();
      
      if(featureLayer !==null){
        this.selectEvent.emit(featureLayer.feature.properties.name);
      }
    }
  }

  private findFeatureLayerByRegionId(id) {
    const layers = this.layers[0].getLayers();
    const featureLayer = layers.find(item => {
      return item.feature.id === id;
    });

    return featureLayer ? featureLayer : null;
  }
}
