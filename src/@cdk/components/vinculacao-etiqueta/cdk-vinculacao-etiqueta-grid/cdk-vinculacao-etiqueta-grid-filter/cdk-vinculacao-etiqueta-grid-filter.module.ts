import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaGridFilterComponent} from './cdk-vinculacao-etiqueta-grid-filter.component';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VinculacaoEtiquetaService,
    ],
    exports: [
        CdkVinculacaoEtiquetaGridFilterComponent
    ]
})
export class CdkVinculacaoEtiquetaGridFilterModule {
}
