import { Component, AfterViewInit } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import Shepherd from 'shepherd.js';
import { steps as defaultSteps, defaultStepOptions} from './data';

@Component({
  selector: 'shepherd',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class ShepherdComponent implements AfterViewInit{

  constructor(private shepherdService: ShepherdService) { }

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    this.shepherdService.start();
  }

    tour:  Shepherd.Tour.TourOptions[] = [
        {
            'exitOnEsc': true,
            'keyboardNavigation': true,
        }
        
    ];
    


}