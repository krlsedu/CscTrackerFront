import {Component} from '@angular/core';
import {PeriodService} from "../../service/period.service";

@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})

export class GanttComponent {
  public constructor(public periodService: PeriodService) {
  }

  divs: string[] = [];

  createDiv(): void {
    this.divs.push('teste'+this.divs.length);
  }
}
