import { Top5SalesAgentDto } from "../dtos/top5-sales-agent-dto.model";
import { BaseResponse } from "../apiresponse.model";

export interface GetTop5SalesAgentsResponse extends BaseResponse {
    results: Top5SalesAgentDto[];
}