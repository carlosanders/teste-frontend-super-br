import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

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
    ],
    exports: [
        CdkComponenteDigitalGridsearchComponent
    ]
})
export class CdkComponenteDigitalGridsearchModule {
}
