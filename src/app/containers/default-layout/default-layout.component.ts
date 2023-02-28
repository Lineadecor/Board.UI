import { Component } from '@angular/core';

import { navItems } from 'src/app/_nav';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [MainFilterService]
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  mainFilter: DefaultFilter;
  
  constructor(
    private library: FaIconLibrary,
    private mainFilterService: MainFilterService) {
    this.library.addIconPacks(fas, far);
    this.mainFilter = new DefaultFilter();

    this.mainFilterService.mainFilter$.subscribe(filterData => {
      this.mainFilter = filterData;
    });
    
    this.mainFilterService.getFilterData();
  }
  
}
