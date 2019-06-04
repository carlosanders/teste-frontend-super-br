import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {CdkVinculacaoProcessoGridsearchComponent} from './cdk-vinculacao-processo-gridsearch.component';
import {CdkVinculacaoProcessoGridModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-grid/cdk-vinculacao-processo-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoGridsearchComponent
    ],
    imports: [

        CdkVinculacaoProcessoGridModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoProcessoService
    ],
    exports: [
        CdkVinculacaoProcessoGridsearchComponent
    ]
})
export class CdkVinculacaoProcessoGridsearchModule {
}
