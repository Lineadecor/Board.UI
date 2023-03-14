import { BaseResponse } from "../apiresponse.model";
import { SalesAgentRegionDetailDto } from "../dtos/sales-agents-region-dto.model";

export interface GetSalesAgentRegionDetailResponse extends BaseResponse {
    results: SalesAgentRegionDetailDto[];
}