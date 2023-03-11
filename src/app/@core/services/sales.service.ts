import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardCompanyBudgetSummaryResponse, 
  MonthlyTotalSalesResponse } from '../data/responses';


@Injectable({
  providedIn: 'root'
})
export class SalesService{

  constructor(private httpClient: HttpClient) { }
  endpoint = "Sales";

  public GetDashboardSummaryDataAsync(year: number,month:string, currency: string, isQuantity: boolean)
  : Observable<DashboardCompanyBudgetSummaryResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Currency', currency)
    .set('Month', month)
    .set('IsQuantity', isQuantity);

    var dataResponse =  this.httpClient
          .post<DashboardCompanyBudgetSummaryResponse>(`${environment.apiUrl}/${this.endpoint}/get_summary`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as DashboardCompanyBudgetSummaryResponse));

   return dataResponse;          
  }


  public GetMonthlySalesDataAsync(year: number, currency: string)
  : Observable<MonthlyTotalSalesResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Currency', currency);

    var dataResponse =  this.httpClient
          .post<MonthlyTotalSalesResponse>(`${environment.apiUrl}/${this.endpoint}/get_monthly_total_sales`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as MonthlyTotalSalesResponse));

   return dataResponse;          
  }
}
