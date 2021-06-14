import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {CdkEtiquetaGridsearchComponent} from './cdk-etiqueta-gridsearch.component';
import {CdkEtiquetaGridModule} from '@cdk/components/etiqueta/cdk-etiqueta-grid/cdk-etiqueta-grid.module';

@NgModule({
    declarations: [
        CdkEtiquetaGridsearchComponent
    ],
    imports: [

        CdkEtiquetaGridModule,

        CdkSharedModule,
    ],
    providers: [
        EtiquetaService
    ],
    exports: [
        CdkEtiquetaGridsearchComponent
    ]
})
export class CdkEtiquetaGridsearchModule {
}
