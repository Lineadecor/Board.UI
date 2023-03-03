import { Observable } from "rxjs";
import { DashboardCompanyBudgetSummaryResponse } from "../data/responses/dashboard-company-budget-summary-response.model";

export interface ISalesService {
    GetDashboardSummaryDataAsync(year: number, month: string, currency: string, isQuantity: boolean): Observable<DashboardCompanyBudgetSummaryResponse>;
}