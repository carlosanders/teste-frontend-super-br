import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAfastamentoService } from '@cdk/services/modalidade-afastamento.service';
import { CdkModalidadeAfastamentoGridFilterComponent } from './cdk-modalidade-afastamento-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeAfastamentoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkModalidadeAfastamentoGridFilterComponent
    ]
})
export class CdkModalidadeAfastamentoGridFilterModule {
}
