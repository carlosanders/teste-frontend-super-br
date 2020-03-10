import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridsearchComponent} from './cdk-vinculacao-modelo-gridsearch.component';
import {CdkVinculacaoModeloGridModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-grid/cdk-vinculacao-modelo-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridsearchComponent
    ],
    imports: [

        CdkVinculacaoModeloGridModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoModeloService
    ],
    exports: [
        CdkVinculacaoModeloGridsearchComponent
    ]
})
export class CdkVinculacaoModeloGridsearchModule {
}
