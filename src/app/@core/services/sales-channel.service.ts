import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISalesChannelService } from '../abstraction/isales-channel-service';
import { DashboardSalesChannelSummaryDataResponse } from '../data/responses/dashboard-sales-channel-summary-data-response.model';
import { SalesChannelOwnersCompanyBudgetMonthlyResponse } from '../data/responses/sales-channel-owners-company-budget-monthly-response.model';
import { SalesChannelOwnersCompanyBudgetDetailResponse } from '../data/responses/sales-channel-owners-company-budget-detail-response.model';
import { GetSalesChannelsResponse } from "../data/responses/get-sales-channels-response.model";
import { GetSalesChannelResponse } from "../data/responses/get-sales-channel-response.model";

@Injectable({
  providedIn: 'root'
})
export class SalesChannelService implements ISalesChannelService {

  constructor(private httpClient: HttpClient) { }
  endpoint = "SalesChannels";

  public GetSalesChannelsAsync(): Observable<GetSalesChannelsResponse> {
    
    var dataResponse =  this.httpClient
          .get<GetSalesChannelsResponse>(`${environment.apiUrl}/${this.endpoint}/get_channels`)
          .pipe(map(data => data as GetSalesChannelsResponse));

   return dataResponse;          
  }

  public GetSalesChannelAsync(channelId: number): Observable<GetSalesChannelResponse> {
    
    var dataResponse =  this.httpClient
          .get<GetSalesChannelResponse>(`${environment.apiUrl}/${this.endpoint}/get_channel/${channelId}`)
          .pipe(map(data => data as GetSalesChannelResponse));

   return dataResponse;          
  }

  public GetDashboardSummaryDataAsync(year: number, months: string, currency: string): Observable<DashboardSalesChannelSummaryDataResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Months', months)
    .set('Currency', currency)
    var dataResponse =  this.httpClient
          .post<DashboardSalesChannelSummaryDataResponse>(`${environment.apiUrl}/${this.endpoint}/get_summary`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as DashboardSalesChannelSummaryDataResponse));

   return dataResponse;          
  }

  public GetSalesChannelOwnersCompanyBudgetMonthlyAsync
  (year: number, currency: string, channelId: number, isQuantity: boolean)
  : Observable<SalesChannelOwnersCompanyBudgetMonthlyResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Currency', currency)
    .set('SalesChannelId',  channelId)
    .set('IsQuantity',  isQuantity);

    var dataResponse =  this.httpClient
          .post<SalesChannelOwnersCompanyBudgetMonthlyResponse>(`${environment.apiUrl}/${this.endpoint}/get_monthly_by_owner`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as SalesChannelOwnersCompanyBudgetMonthlyResponse));

   return dataResponse;          
  }

  public GetSalesChannelOwnersCompanyBudgetDetailAsync(year: number, currency: string, channelId: number, isQuantity: boolean): Observable<SalesChannelOwnersCompanyBudgetDetailResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Currency', currency)
    .set('SalesChannelId',  channelId)
    .set('IsQuantity',  isQuantity);

    var dataResponse =  this.httpClient
          .post<SalesChannelOwnersCompanyBudgetDetailResponse>(`${environment.apiUrl}/${this.endpoint}/get_details_by_owner`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as SalesChannelOwnersCompanyBudgetDetailResponse));

   return dataResponse;          
  }
}
