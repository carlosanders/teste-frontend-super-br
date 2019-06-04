import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeVinculacaoProcessoService } from '@cdk/services/modalidade-vinculacao-processo.service';
import { CdkModalidadeVinculacaoProcessoGridFilterComponent } from './cdk-modalidade-vinculacao-processo-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoProcessoService,
    ],
    exports: [
        CdkModalidadeVinculacaoProcessoGridFilterComponent
    ]
})
export class CdkModalidadeVinculacaoProcessoGridFilterModule {
}
