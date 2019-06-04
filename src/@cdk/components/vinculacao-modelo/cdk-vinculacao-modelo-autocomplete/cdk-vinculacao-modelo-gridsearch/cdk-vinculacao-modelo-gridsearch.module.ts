import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloGridsearchComponent} from './cdk-vinculacao-modelo-gridsearch.component';
import {CdkVinculacaoModeloGridModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-grid/cdk-vinculacao-modelo-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoModeloGridsearchComponent
    ],
    imports: [

        CdkVinculacaoModeloGridModule,

        FuseSharedModule,
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
