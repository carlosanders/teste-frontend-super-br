import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeQualificacaoPessoaService} from '@cdk/services/modalidade-qualificacao-pessoa.service';
import {CdkModalidadeQualificacaoPessoaGridComponent} from './cdk-modalidade-qualificacao-pessoa-grid.component';
import {CdkModalidadeQualificacaoPessoaAutocompleteModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';
import {CdkModalidadeQualificacaoPessoaFilterModule} from '../sidebars/cdk-modalidade-qualificacao-pessoa-filter/cdk-modalidade-qualificacao-pessoa-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeQualificacaoPessoaGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkModalidadeQualificacaoPessoaAutocompleteModule,
        CdkModalidadeQualificacaoPessoaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
