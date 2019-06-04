import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeEtiquetaService } from '@cdk/services/modalidade-etiqueta.service';
import { CdkModalidadeEtiquetaGridFilterComponent } from './cdk-modalidade-etiqueta-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeEtiquetaService,
    ],
    exports: [
        CdkModalidadeEtiquetaGridFilterComponent
    ]
})
export class CdkModalidadeEtiquetaGridFilterModule {
}
