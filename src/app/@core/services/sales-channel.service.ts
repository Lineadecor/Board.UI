import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ISalesChannelService } from '../abstraction/isales-channel-service';
import { DashboardSalesChannelSummaryDataResponse } from '../data/responses/dashboard-sales-channel-summary-data-response.model';

@Injectable({
  providedIn: 'root'
})
export class SalesChannelService implements ISalesChannelService {

  constructor(private httpClient: HttpClient) { }
  endpoint = "SalesChannels";

  public GetDashboardSummaryDataAsync(year: number, currency: string): Observable<DashboardSalesChannelSummaryDataResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Currency', currency)
    var dataResponse =  this.httpClient
          .post<DashboardSalesChannelSummaryDataResponse>(`${environment.apiUrl}/${this.endpoint}/getsummary`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as DashboardSalesChannelSummaryDataResponse));

   return dataResponse;          
  }
}
