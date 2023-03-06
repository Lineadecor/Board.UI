import { BaseResponse } from "../apiresponse.model";
import { SalesChannelDto } from "../dtos/sales-channel-dto.model";

export interface GetSalesChannelResponse extends BaseResponse {
    results: SalesChannelDto;
}