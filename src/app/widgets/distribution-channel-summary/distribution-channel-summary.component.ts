import { Component } from '@angular/core';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { DistributionChannelSummaryDto } from 'src/app/@core/data/dtos/distribution-channel-summary-dto.model';
import { DistributionChannelService} from 'src/app/@core/services/distribution-channel.service';

@Component({
  selector: 'app-distribution-channel-summary',
  templateUrl: './distribution-channel-summary.component.html',
  styleUrls: ['./distribution-channel-summary.component.scss'],
  providers: [DistributionChannelService]
})
export class DistributionChannelSummaryComponent {
  color = ["info", "danger", "warning", "success"];
  distData : DistributionChannelSummaryDto[]
  public mainFilter: DefaultFilter = new DefaultFilter();

  constructor(private mainFilterService: MainFilterService,
    private distChannelService: DistributionChannelService
    ) {
    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
    });

    this.distChannelService.GetDistributionChannelSummaryAsync({
      year : this.mainFilter.year,
      currency : this.mainFilter.currency,
      months: this.mainFilter.listMonths.join(",")
    }).subscribe(data => {
      if (data.isSuccess) {
        this.distData = data.results;
      } else {
        console.error("Data alınamadı");
      }

    });
  }
}
