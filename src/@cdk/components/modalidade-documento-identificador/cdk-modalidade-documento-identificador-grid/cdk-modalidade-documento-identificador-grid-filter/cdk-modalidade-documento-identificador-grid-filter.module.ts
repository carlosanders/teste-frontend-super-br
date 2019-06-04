import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeDocumentoIdentificadorService } from '@cdk/services/modalidade-documento-identificador.service';
import { CdkModalidadeDocumentoIdentificadorGridFilterComponent } from './cdk-modalidade-documento-identificador-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeDocumentoIdentificadorService,
    ],
    exports: [
        CdkModalidadeDocumentoIdentificadorGridFilterComponent
    ]
})
export class CdkModalidadeDocumentoIdentificadorGridFilterModule {
}
