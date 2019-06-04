import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoGridFilterComponent} from './cdk-vinculacao-documento-grid-filter.component';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VinculacaoDocumentoService,
    ],
    exports: [
        CdkVinculacaoDocumentoGridFilterComponent
    ]
})
export class CdkVinculacaoDocumentoGridFilterModule {
}
