import {Injectable}      from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DefaultFilter } from '../data/models/main-filter';


@Injectable()
export class MainFilterService {
    //Source
  private _mainFilterSource = new BehaviorSubject<DefaultFilter>(new DefaultFilter());
    // Stream
  mainFilter$ = this._mainFilterSource.asObservable();
  private cookieName= 'MainFilter';
  constructor(private cookieService: CookieService) {
    this.getFilterData();
  }

  setMainFilterData(filter: DefaultFilter) : void{
    this.cookieService.set(this.cookieName, JSON.stringify(filter));
    this._mainFilterSource.next(filter);
  }
  
  getFilterData(): void {
    let filterData = this.cookieService.get(this.cookieName);
    if(!filterData) {
        this.setMainFilterData(new DefaultFilter());
        return;
    }
    this._mainFilterSource.next(JSON.parse(filterData) as DefaultFilter);
  }
}