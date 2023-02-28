import { Observable } from "rxjs";
import { DashboardSalesChannelSummaryDataResponse } from "../data/responses/dashboard-sales-channel-summary-data-response.model";

export interface ISalesChannelService {
    GetDashboardSummaryDataAsync(year: number, currency: string): Observable<DashboardSalesChannelSummaryDataResponse>;

}