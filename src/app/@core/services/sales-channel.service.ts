import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DashboardSalesChannelSummaryDataResponse,
  GetSalesChannelResponse,
  GetSalesChannelsResponse,
  GetTop5SalesAgentsResponse,
  SalesChannelOwnersCompanyBudgetDetailResponse,
  SalesChannelOwnersCompanyBudgetMonthlyResponse,
  GetSalesAgentRegionDetailResponse
} from '../data/responses';

import { ApiCommunicationService } from "./api-communication-service";

@Injectable({
  providedIn: 'root'
})
export class SalesChannelService {

  constructor(private httpClient: HttpClient) { }
  endpoint = "SalesChannels";

  public GetSalesChannelsAsync(): Observable<GetSalesChannelsResponse> {

      var service = new ApiCommunicationService<GetSalesChannelsResponse>(this.httpClient, this.endpoint);
      var dataResponse = service.get("get_channels", null);
    return dataResponse;
  }

  public GetSalesChannelAsync(channelId: number): Observable<GetSalesChannelResponse> {
      var service = new ApiCommunicationService<GetSalesChannelResponse>(this.httpClient, this.endpoint);
      var dataResponse = service.get("get_channel", channelId);
    return dataResponse;
  }

  public GetDashboardSummaryDataAsync(params: {year: number, months: string, currency: string})
    : Observable<DashboardSalesChannelSummaryDataResponse> {
   
      var service = new ApiCommunicationService<DashboardSalesChannelSummaryDataResponse>(this.httpClient, this.endpoint);
      var dataResponse = service.post("get_summary", params);
    return dataResponse;
  }

  public GetSalesChannelOwnersCompanyBudgetMonthlyAsync
    (params: { year: number, currency: string, salesChannelId: number, isQuantity: boolean })
    : Observable<SalesChannelOwnersCompanyBudgetMonthlyResponse> {

    var service = new ApiCommunicationService<SalesChannelOwnersCompanyBudgetMonthlyResponse>(this.httpClient, this.endpoint);
    var dataResponse = service.post("get_monthly_by_owner", params);
    return dataResponse;
  }

  public GetSalesChannelOwnersCompanyBudgetDetailAsync
    (params: { year: number, currency: string, salesChannelId: number, isQuantity: boolean })
    : Observable<SalesChannelOwnersCompanyBudgetDetailResponse> {
    var service = new ApiCommunicationService<SalesChannelOwnersCompanyBudgetDetailResponse>(this.httpClient, this.endpoint);
    var dataResponse = service.post("get_details_by_owner", params);
    return dataResponse;
  }

  public GetTop5SalesAgentsAsync(params: { year: number, months: string, currency: string, salesOrganisation: string })
    : Observable<GetTop5SalesAgentsResponse> {

    var service = new ApiCommunicationService<GetTop5SalesAgentsResponse>(this.httpClient, this.endpoint);

    var dataResponse = service.post("get_top5_sales_agent", params);

    return dataResponse;
  }

  public GetSalesAgentRegionDetailAsync(params: {
    year: number, months: string, currency: string,
    salesOrganisation: string, region: string
  })
    : Observable<GetSalesAgentRegionDetailResponse> {

    var service = new ApiCommunicationService<GetSalesAgentRegionDetailResponse>(this.httpClient, this.endpoint);

    var dataResponse = service.post("get_sales_agent_by_region", params);

    return dataResponse;
  }
}
