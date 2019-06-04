import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {CdkGeneroDocumentoAvulsoGridFilterComponent} from './cdk-genero-documento-avulso-grid-filter.component';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAvulsoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        GeneroDocumentoAvulsoService,
    ],
    exports: [
        CdkGeneroDocumentoAvulsoGridFilterComponent
    ]
})
export class CdkGeneroDocumentoAvulsoGridFilterModule {
}
