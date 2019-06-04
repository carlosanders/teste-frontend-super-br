import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieDocumentoAvulsoService } from '@cdk/services/especie-documento-avulso.service';
import { CdkEspecieDocumentoAvulsoGridFilterComponent } from './cdk-especie-documento-avulso-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieDocumentoAvulsoService,
    ],
    exports: [
        CdkEspecieDocumentoAvulsoGridFilterComponent
    ]
})
export class CdkEspecieDocumentoAvulsoGridFilterModule {
}
