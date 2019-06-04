import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeRepresentanteService } from '@cdk/services/modalidade-representante.service';
import { CdkModalidadeRepresentanteGridFilterComponent } from './cdk-modalidade-representante-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeRepresentanteGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepresentanteService,
    ],
    exports: [
        CdkModalidadeRepresentanteGridFilterComponent
    ]
})
export class CdkModalidadeRepresentanteGridFilterModule {
}
