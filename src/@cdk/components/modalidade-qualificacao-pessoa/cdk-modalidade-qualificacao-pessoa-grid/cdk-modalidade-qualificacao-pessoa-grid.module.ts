import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeQualificacaoPessoaService } from '@cdk/services/modalidade-qualificacao-pessoa.service';
import { CdkModalidadeQualificacaoPessoaGridComponent} from './cdk-modalidade-qualificacao-pessoa-grid.component'
import { CdkModalidadeQualificacaoPessoaAutocompleteModule } from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';
import {CdkModalidadeQualificacaoPessoaGridFilterModule} from './cdk-modalidade-qualificacao-pessoa-grid-filter/cdk-modalidade-qualificacao-pessoa-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeQualificacaoPessoaGridComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkModalidadeQualificacaoPessoaAutocompleteModule,
        CdkModalidadeQualificacaoPessoaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeQualificacaoPessoaService,
    ],
    exports: [
        CdkModalidadeQualificacaoPessoaGridComponent
    ]
})
export class CdkModalidadeQualificacaoPessoaGridModule {
}
