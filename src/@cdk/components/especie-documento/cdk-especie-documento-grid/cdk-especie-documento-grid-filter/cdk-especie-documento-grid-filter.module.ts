import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieDocumentoService } from '@cdk/services/especie-documento.service';
import { CdkEspecieDocumentoGridFilterComponent } from './cdk-especie-documento-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieDocumentoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieDocumentoService,
    ],
    exports: [
        CdkEspecieDocumentoGridFilterComponent
    ]
})
export class CdkEspecieDocumentoGridFilterModule {
}
