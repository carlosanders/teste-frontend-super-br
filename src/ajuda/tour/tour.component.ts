import { Component, AfterViewInit, AfterViewChecked, OnDestroy} from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import Shepherd from 'shepherd.js';
import { steps as defaultSteps, defaultStepOptions} from './data';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

@Component({
  selector: 'shepherd',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class ShepherdComponent implements AfterViewChecked{

  constructor(
      public shepherdService: ShepherdService,
      public _cdkSidebarService: CdkSidebarService,
  ) { }

  tourInicio: boolean;

  ngAfterViewChecked() {

       if(this.shepherdService.isActive === false){
            this._cdkSidebarService.getSidebar('navbar').toggleFold();
            this.tourInicio = false;
            this.shepherdService.isActive = true;
        }

  }

    tour:  Shepherd.Tour.TourOptions[] = [
        {
            'exitOnEsc': true,
            'keyboardNavigation': true,
        }

    ];

}
