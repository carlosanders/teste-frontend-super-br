import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TipoDocumentoService } from '@cdk/services/tipo-documento.service';
import { CdkTipoDocumentoGridFilterComponent } from './cdk-tipo-documento-grid-filter.component';

@NgModule({
    declarations: [
        CdkTipoDocumentoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        TipoDocumentoService,
    ],
    exports: [
        CdkTipoDocumentoGridFilterComponent
    ]
})
export class CdkTipoDocumentoGridFilterModule {
}
