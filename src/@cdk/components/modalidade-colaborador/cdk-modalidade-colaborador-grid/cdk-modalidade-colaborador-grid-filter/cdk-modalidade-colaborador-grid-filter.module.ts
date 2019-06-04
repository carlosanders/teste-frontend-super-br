import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeColaboradorService } from '@cdk/services/modalidade-colaborador.service';
import { CdkModalidadeColaboradorGridFilterComponent } from './cdk-modalidade-colaborador-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeColaboradorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeColaboradorService,
    ],
    exports: [
        CdkModalidadeColaboradorGridFilterComponent
    ]
})
export class CdkModalidadeColaboradorGridFilterModule {
}
