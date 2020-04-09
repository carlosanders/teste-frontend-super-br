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
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGeneroPessoaService} from '@cdk/services/modalidade-genero-pessoa.service';
import {CdkModalidadeGeneroPessoaGridComponent} from './cdk-modalidade-genero-pessoa-grid.component';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';
import {CdkModalidadeGeneroPessoaFilterModule} from '../sidebars/cdk-modalidade-genero-pessoa-filter/cdk-modalidade-genero-pessoa-filter.module';
import {CdkModalidadeGeneroPessoaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeGeneroPessoaGridComponent,
        CdkModalidadeGeneroPessoaMainSidebarComponent,
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

        CdkModalidadeGeneroPessoaAutocompleteModule,
        CdkModalidadeGeneroPessoaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeGeneroPessoaService,
    ],
    exports: [
        CdkModalidadeGeneroPessoaGridComponent
    ]
})
export class CdkModalidadeGeneroPessoaGridModule {
}
