import {Component, ViewEncapsulation} from '@angular/core';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector     : 'maintenance',
    templateUrl  : './maintenance.component.html',
    styleUrls    : ['./maintenance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class MaintenanceComponent
{
    /**
     * Constructor
     *
     * @param _cdkConfigService
     */
    constructor(
        public _cdkConfigService: CdkConfigService
    )
    {
        // Configure the layout
        this._cdkConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
}
