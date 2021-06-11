import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {PaisService} from '@cdk/services/pais.service';
import {CdkPaisGridsearchComponent} from './cdk-pais-gridsearch.component';
import {CdkPaisGridModule} from '@cdk/components/pais/cdk-pais-grid/cdk-pais-grid.module';

@NgModule({
    declarations: [
        CdkPaisGridsearchComponent
    ],
    imports: [

        CdkPaisGridModule,

        CdkSharedModule,
    ],
    providers: [
        PaisService
    ],
    exports: [
        CdkPaisGridsearchComponent
    ]
})
export class CdkPaisGridsearchModule {
}
