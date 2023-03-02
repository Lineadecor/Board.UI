import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { DropdownListItem } from 'src/app/@core/data/models/dropdown-list-item';
import { DefaultFilter } from "src/app/@core/data/models/main-filter";
import { MainFilterService } from "src/app/@core/services/filter-values.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  mainFilter: DefaultFilter = new DefaultFilter();

  years = new Array<number>();
  currencies = new Array<string>();

  list = new Array<DropdownListItem>();
  checkedList = new Array<DropdownListItem>();

  months = ['', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
  constructor(private classToggler: ClassToggleService,
    private mainFilterService: MainFilterService) {
    super();
    this.setFilterVariables();
    this.mainFilterService.mainFilter$.subscribe(filterValues => this.mainFilter = filterValues);

    for (let index = 1; index < this.months.length; index++) {

      if (this.mainFilter.listMonths === undefined || this.mainFilter.listMonths?.length === 0) {
        if (index === new Date().getMonth()) {
          this.list.push({ checked: true, name: this.months[index], value: index })
          this.checkedList.push({ checked: true, name: this.months[index], value: index });
        } else {
          this.list.push({ checked: false, name: this.months[index], value: index });
        }
      } else {
        if (this.mainFilter.listMonths.indexOf(index) >= 0) {
          this.list.push({ checked: true, name: this.months[index], value: index })
          this.checkedList.push({ checked: true, name: this.months[index], value: index });

        } else {
          this.list.push({ checked: false, name: this.months[index], value: index });
        }

      }
    }

  }


  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
  }

  setFilterVariables() {
    const currentYear = new Date().getFullYear();

    for (let index = 0; index < 10; index++) {
      this.years.push(currentYear - index);
    }
    this.currencies = ["EUR", "TRY"];

  }

  refreshPage() {
    this.mainFilter.listMonths =  this.checkedList.map(val=> val.value).sort();
    this.mainFilterService.setMainFilterData(this.mainFilter);
    window.location.reload();
  }

  fullScreen() {
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen;
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
}
}
