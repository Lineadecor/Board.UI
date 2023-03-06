import { BaseResponse } from "../apiresponse.model";
import { BudgetSalesChannelByOwnerDetailDto } from "../dtos/budget-sales-channel-by-owner-detail-dto.model";

export interface SalesChannelOwnersCompanyBudgetDetailResponse extends BaseResponse {
    results: BudgetSalesChannelByOwnerDetailDto[];
}