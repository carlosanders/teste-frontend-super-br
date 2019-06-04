import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {CdkGeneroDocumentoGridFilterComponent} from './cdk-genero-documento-grid-filter.component';

@NgModule({
    declarations: [
        CdkGeneroDocumentoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        GeneroDocumentoService,
    ],
    exports: [
        CdkGeneroDocumentoGridFilterComponent
    ]
})
export class CdkGeneroDocumentoGridFilterModule {
}
