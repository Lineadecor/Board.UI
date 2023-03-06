import { BaseResponse } from "../apiresponse.model";
import { SalesChannelDto } from "../dtos/sales-channel-dto.model";

export interface GetSalesChannelsResponse extends BaseResponse {
    results: SalesChannelDto[];
}