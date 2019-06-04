import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeRelacionamentoPessoalService } from '@cdk/services/modalidade-relacionamento-pessoal.service';
import { CdkModalidadeRelacionamentoPessoalGridFilterComponent } from './cdk-modalidade-relacionamento-pessoal-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeRelacionamentoPessoalGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRelacionamentoPessoalService,
    ],
    exports: [
        CdkModalidadeRelacionamentoPessoalGridFilterComponent
    ]
})
export class CdkModalidadeRelacionamentoPessoalGridFilterModule {
}
