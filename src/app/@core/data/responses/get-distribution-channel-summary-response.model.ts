import { BaseResponse } from "../apiresponse.model";
import { DistributionChannelSummaryDto } from "../dtos/distribution-channel-summary-dto.model";

export interface GetDistributionChannelSummaryResponse extends BaseResponse {
    results: DistributionChannelSummaryDto[];
}