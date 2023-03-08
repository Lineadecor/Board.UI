import { BaseResponse } from "../apiresponse.model";
import { SalesMonthlyDto } from "../dtos/sales-monthly-dto.model";


export interface MonthlyTotalSalesResponse extends BaseResponse {
    results: SalesMonthlyDto[];
}