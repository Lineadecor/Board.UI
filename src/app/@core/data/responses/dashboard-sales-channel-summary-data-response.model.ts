import { BaseResponse } from "../apiresponse.model";
import { SalesChannelDashboardSummaryDto } from "../dtos/sales-channel-dashboard-summary-dto.model";

export interface DashboardSalesChannelSummaryDataResponse extends BaseResponse {
    results: SalesChannelDashboardSummaryDto[];
}
