import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoGridFilterComponent} from './cdk-documento-avulso-grid-filter.component';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        DocumentoAvulsoService,
    ],
    exports: [
        CdkDocumentoAvulsoGridFilterComponent
    ]
})
export class CdkDocumentoAvulsoGridFilterModule {
}
