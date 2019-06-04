import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeColaboradorService } from '@cdk/services/modalidade-colaborador.service';
import { CdkColaboradorGridFilterComponent } from './cdk-colaborador-grid-filter.component';

@NgModule({
    declarations: [
        CdkColaboradorGridFilterComponent,
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
        CdkColaboradorGridFilterComponent
    ]
})
export class CdkColaboradorGridFilterModule {
}
