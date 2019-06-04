import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeVinculacaoProcessoService } from '@cdk/services/modalidade-vinculacao-processo.service';
import { CdkModalidadeVinculacaoProcessoGridsearchComponent } from './cdk-modalidade-vinculacao-processo-gridsearch.component';
import { CdkModalidadeVinculacaoProcessoGridModule } from '@cdk/components/modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-grid/cdk-modalidade-vinculacao-processo-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoGridsearchComponent
    ],
    imports: [

        CdkModalidadeVinculacaoProcessoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoProcessoService
    ],
    exports: [
        CdkModalidadeVinculacaoProcessoGridsearchComponent
    ]
})
export class CdkModalidadeVinculacaoProcessoGridsearchModule {
}
