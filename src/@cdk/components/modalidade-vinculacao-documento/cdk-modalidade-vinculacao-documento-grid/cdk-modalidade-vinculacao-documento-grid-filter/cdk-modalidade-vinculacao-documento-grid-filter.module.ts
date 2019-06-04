import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeVinculacaoDocumentoService } from '@cdk/services/modalidade-vinculacao-documento.service';
import { CdkModalidadeVinculacaoDocumentoGridFilterComponent } from './cdk-modalidade-vinculacao-documento-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoDocumentoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoDocumentoService,
    ],
    exports: [
        CdkModalidadeVinculacaoDocumentoGridFilterComponent
    ]
})
export class CdkModalidadeVinculacaoDocumentoGridFilterModule {
}
