import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeQualificacaoPessoaService } from '@cdk/services/modalidade-qualificacao-pessoa.service';
import { CdkModalidadeQualificacaoPessoaGridFilterComponent } from './cdk-modalidade-qualificacao-pessoa-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeQualificacaoPessoaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeQualificacaoPessoaService,
    ],
    exports: [
        CdkModalidadeQualificacaoPessoaGridFilterComponent
    ]
})
export class CdkModalidadeQualificacaoPessoaGridFilterModule {
}
