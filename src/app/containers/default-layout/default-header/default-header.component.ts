import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  providers: [MainFilterService]
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";
  @Input() mainFilter: DefaultFilter = new DefaultFilter();

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  years= new Array<number>();
  currentYear  = new Date().getFullYear();
  currencies = ["EUR","TRY"];
  constructor(private classToggler: ClassToggleService,
    library: FaIconLibrary,
    private mainFilterService: MainFilterService) {
    library.addIconPacks(fas, far);
    super();
   
    this.mainFilterService.mainFilter$.subscribe(filterData => {
      this.mainFilter = filterData;
      
    });
    
    for (let index = 0; index < 10; index++) {
      this.years.push(this.currentYear - index);
    }
  }

  refreshPage(){
    this.mainFilterService.setMainFilterData(this.mainFilter);

    window.location.reload();

  }


}
