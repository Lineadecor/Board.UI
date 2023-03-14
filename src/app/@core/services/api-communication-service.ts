import { BaseResponse } from "../data/apiresponse.model";
import {  map } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { JSonUtil } from "../helpers/json-util";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export class ApiCommunicationService<TResponse extends BaseResponse> {
  constructor(
    private httpClient: HttpClient,
    private endpoint: string,
  ) { }

  repsonse: any;
  public intialize(output: TResponse) {
    this.repsonse = output;
  }

  public post(method: string, params: any): Observable<TResponse> {

    const body = new HttpParams({fromObject: params});

    return this.httpClient
          .post<TResponse>(`${environment.apiUrl}/${this.endpoint}/${method}`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as TResponse));
  }

  public put(method: string, params: any): Observable<TResponse> {

    const body = new HttpParams({fromObject: params});

    return this.httpClient
          .put<TResponse>(`${environment.apiUrl}/${this.endpoint}/${method}`, body.toString(), 
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          })
          .pipe(map(data => data as TResponse));
  }

  public get(method: string, id: number | null): Observable<TResponse> {
    const url = `${environment.apiUrl}/${this.endpoint}/${method}${(id ? "/"+ id  : "")}`;
    return this.httpClient
      .get(url)
      .pipe(map(data => data as TResponse));
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  
}
