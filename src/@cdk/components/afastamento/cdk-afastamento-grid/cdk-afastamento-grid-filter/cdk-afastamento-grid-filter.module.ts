import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAfastamentoService } from '@cdk/services/modalidade-afastamento.service';
import { CdkAfastamentoGridFilterComponent } from './cdk-afastamento-grid-filter.component';

@NgModule({
    declarations: [
        CdkAfastamentoGridFilterComponent,
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
        CdkAfastamentoGridFilterComponent
    ]
})
export class CdkAfastamentoGridFilterModule {
}
