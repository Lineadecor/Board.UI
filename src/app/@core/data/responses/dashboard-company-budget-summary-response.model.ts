import { BaseResponse } from "../apiresponse.model";
import { CompanyBudgetSummaryDto } from "../dtos/company-budget-summary-dto.model";

export interface DashboardCompanyBudgetSummaryResponse extends BaseResponse {
    results: CompanyBudgetSummaryDto[];
}