import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { DefaultFilter} from "src/app/@core/data/models/main-filter";
import { MainFilterService} from "src/app/@core/services/filter-values.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  mainFilter :DefaultFilter = new DefaultFilter();

  years = new Array<number>();
  currencies = new Array<string>();
  constructor(private classToggler: ClassToggleService,
    private mainFilterService: MainFilterService) {
    super();
    this.setFilterVariables();
    this.mainFilterService.mainFilter$.subscribe(filterValues => this.mainFilter = filterValues);
  }

  setFilterVariables() {
    const currentYear = new Date().getFullYear();

    for (let index = 0; index < 10; index++) {
      this.years.push(currentYear - 0);
    }
    this.currencies = ["EUR", "TRY"];
  }

  refreshPage() {
    this.mainFilterService.setMainFilterData(this.mainFilter);
    window.location.reload();
  }
}
