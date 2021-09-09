import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CdkRegraEtiquetaGridsearchComponent} from './cdk-regra-etiqueta-gridsearch.component';
import {CdkRegraEtiquetaGridModule} from '../../cdk-regra-etiqueta-grid/cdk-regra-etiqueta-grid.module';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';

@NgModule({
    declarations: [
        CdkRegraEtiquetaGridsearchComponent
    ],
    imports: [
        CdkRegraEtiquetaGridModule,

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
