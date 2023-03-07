import { BaseResponse } from "../apiresponse.model";
import { BudgetSalesChannelByOwnerMonthlyDto } from "../dtos/budget-sales-channel-by-owner-monthly-dto.model";

export interface SalesChannelOwnersCompanyBudgetMonthlyResponse extends BaseResponse {
    results: BudgetSalesChannelByOwnerMonthlyDto[];
}