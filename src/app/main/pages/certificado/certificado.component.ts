import {Component, ViewEncapsulation} from '@angular/core';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector     : 'certificado',
    templateUrl  : './certificado.component.html',
    styleUrls    : ['./certificado.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class CertificadoComponent
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
