import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalGridsearchComponent} from './cdk-componente-digital-gridsearch.component';
import {CdkComponenteDigitalGridModule} from '@cdk/components/componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridsearchComponent
    ],
    imports: [

        CdkComponenteDigitalGridModule,

        CdkSharedModule,
    ],
    providers: [
        ComponenteDigitalService
    ],
    exports: [
        CdkComponenteDigitalGridsearchComponent
    ]
})
export class CdkComponenteDigitalGridsearchModule {
}
