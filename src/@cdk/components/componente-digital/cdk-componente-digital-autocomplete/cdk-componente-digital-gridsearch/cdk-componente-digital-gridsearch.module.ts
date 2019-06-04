import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalGridsearchComponent} from './cdk-componente-digital-gridsearch.component';
import {CdkComponenteDigitalGridModule} from '@cdk/components/componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridsearchComponent
    ],
    imports: [

        CdkComponenteDigitalGridModule,

        FuseSharedModule,
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
