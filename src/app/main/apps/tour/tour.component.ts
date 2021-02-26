import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import Shepherd from 'shepherd.js';
import { steps as defaultSteps, defaultStepOptions} from './data';
import {CdkSidebarService} from "../../../../@cdk/components/sidebar/sidebar.service";

@Component({
  selector: 'shepherd',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class ShepherdComponent implements AfterViewInit, AfterViewChecked{

  constructor(
      public shepherdService: ShepherdService,
      public _cdkSidebarService: CdkSidebarService,
  ) { }

  tourInicio: boolean;

  ngAfterViewInit() {
    this.tourInicio = true;
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.isActive=true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    this.shepherdService.start();
  }

  ngAfterViewChecked() {
      if(this.tourInicio === true && this.shepherdService.isActive === false){
          this._cdkSidebarService.getSidebar('navbar').toggleFold();
          this.tourInicio = false;
      }

  }


    tour:  Shepherd.Tour.TourOptions[] = [
        {
            'exitOnEsc': true,
            'keyboardNavigation': true,
        }

    ];

}
