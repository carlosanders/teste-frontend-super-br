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
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeGeneroPessoaService} from '@cdk/services/modalidade-genero-pessoa.service';
import {CdkModalidadeGeneroPessoaGridComponent} from './cdk-modalidade-genero-pessoa-grid.component';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';
import {CdkModalidadeGeneroPessoaGridFilterModule} from './cdk-modalidade-genero-pessoa-grid-filter/cdk-modalidade-genero-pessoa-grid-filter.module';
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
        CdkModalidadeGeneroPessoaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
