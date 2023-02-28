import { BaseResponse } from "../data/apiresponse.model";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { JSonUtil } from "../helpers/json-util";
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ApiCommunicationService<TResponse extends BaseResponse> {
    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string,
        ) {
          
        }

      repsonse: any; 
      public intialize(output: TResponse){
        this.repsonse= output;
      }

      public post(item: any): Observable<TResponse> {

        return this.httpClient
          .post<TResponse>(`${this.url}/${this.endpoint}`, JSonUtil.serialize(item))
          .pipe(map(data => JSonUtil.deSerialize<TResponse>(this.repsonse, data) as TResponse));
      }
    
      public put(item: any): Observable<TResponse> {
        return this.httpClient
          .put<TResponse>(`${this.url}/${this.endpoint}/${item.id}`,
            JSonUtil.serialize(item))
          .pipe(map(data => JSonUtil.deSerialize<TResponse>(this.repsonse, data) as TResponse));
      }
    
      public read(id: number): Observable<TResponse> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/${id}`)
          .pipe(map((data: any) => JSonUtil.deSerialize<TResponse>(this.repsonse, data) as TResponse));
      }
    
      delete(id: number) {
        return this.httpClient
          .delete(`${this.url}/${this.endpoint}/${id}`);
      }
    
    }
