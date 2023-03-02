import { Observable } from "rxjs";
import { DashboardCompanyBudgetSummaryResponse } from "../data/responses/dashboard-company-budget-summary-response.model";

export interface ISalesService {
    GetDashboardSummaryDataAsync(year: number, currency: string, isQuantity: boolean): Observable<DashboardCompanyBudgetSummaryResponse>;
}