import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDistributionChannelSummaryResponse } from '../data/responses';
import { ApiCommunicationService } from './api-communication-service';


@Injectable({
  providedIn: 'root'
})
export class DistributionChannelService{

  constructor(private httpClient: HttpClient) { }
  endpoint = "DistributionChannels";

  public GetDistributionChannelSummaryAsync(params: {year: number,months:string, currency: string})
  : Observable<GetDistributionChannelSummaryResponse> {

          var service = new ApiCommunicationService<GetDistributionChannelSummaryResponse>(this.httpClient, this.endpoint);
          var dataResponse = service.post("get_summary", params);
   return dataResponse;          
  }

}
