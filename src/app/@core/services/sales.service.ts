import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISalesService } from '../abstraction/isales-service';
import { DashboardCompanyBudgetSummaryResponse } from '../data/responses/dashboard-company-budget-summary-response.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService implements ISalesService {

  constructor(private httpClient: HttpClient) { }
  endpoint = "Sales";

  public GetDashboardSummaryDataAsync(year: number,month:string, currency: string, isQuantity: boolean): Observable<DashboardCompanyBudgetSummaryResponse> {
    const body = new HttpParams()
    .set('Year', year)
    .set('Currency', currency)
    .set('Month', month)
    .set('IsQuantity', isQuantity);

    var dataResponse =  this.httpClient
          .post<DashboardCompanyBudgetSummaryResponse>(`${environment.apiUrl}/${this.endpoint}/getsummary`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as DashboardCompanyBudgetSummaryResponse));

   return dataResponse;          
  }
}
