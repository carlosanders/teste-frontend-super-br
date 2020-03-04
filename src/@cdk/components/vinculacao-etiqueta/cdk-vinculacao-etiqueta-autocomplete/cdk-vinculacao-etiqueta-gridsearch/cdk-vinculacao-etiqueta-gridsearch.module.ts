import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaGridsearchComponent} from './cdk-vinculacao-etiqueta-gridsearch.component';
import {CdkVinculacaoEtiquetaGridModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-grid/cdk-vinculacao-etiqueta-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaGridsearchComponent
    ],
    imports: [

        CdkVinculacaoEtiquetaGridModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoEtiquetaService
    ],
    exports: [
        CdkVinculacaoEtiquetaGridsearchComponent
    ]
})
export class CdkVinculacaoEtiquetaGridsearchModule {
}
