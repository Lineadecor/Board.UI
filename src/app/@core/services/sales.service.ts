import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardCompanyBudgetSummaryResponse, 
  MonthlyTotalSalesResponse } from '../data/responses';
import { ApiCommunicationService } from './api-communication-service';


@Injectable({
  providedIn: 'root'
})
export class SalesService{

  constructor(private httpClient: HttpClient) { }
  endpoint = "Sales";

  public GetDashboardSummaryDataAsync(params: {year: number,month:string, currency: string, isQuantity: boolean})
  : Observable<DashboardCompanyBudgetSummaryResponse> {

          var service = new ApiCommunicationService<DashboardCompanyBudgetSummaryResponse>(this.httpClient, this.endpoint);
          var dataResponse = service.post("get_summary", params);
   return dataResponse;          
  }


  public GetMonthlySalesDataAsync(params: {year: number, currency: string})
  : Observable<MonthlyTotalSalesResponse> {

          var service = new ApiCommunicationService<MonthlyTotalSalesResponse>(this.httpClient, this.endpoint);
          var dataResponse = service.post("get_monthly_total_sales", params);
   return dataResponse;          
  }
}
