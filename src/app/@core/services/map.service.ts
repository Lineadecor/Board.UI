import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class MapService {

  constructor(private http: HttpClient) {}

  getCords(): Observable<any> {
    return this.http.get('assets/tr-cities.json');
  }

}