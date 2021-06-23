import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CdkRegraEtiquetaGridsearchComponent} from './cdk-regra-gridsearch.component';
import {CdkRegraGridModule} from '../../cdk-regra-grid/cdk-regra-grid.module';
import {RegraEtiquetaService} from '@cdk/services/regra.service';

@NgModule({
    declarations: [
        CdkRegraEtiquetaGridsearchComponent
    ],
    imports: [
        CdkRegraGridModule,

        CdkSharedModule,
    ],
    providers: [
        RegraEtiquetaService
    ],
    exports: [
        CdkRegraEtiquetaGridsearchComponent
    ]
})
export class CdkRegraEtiquetaGridsearchModule {
}
