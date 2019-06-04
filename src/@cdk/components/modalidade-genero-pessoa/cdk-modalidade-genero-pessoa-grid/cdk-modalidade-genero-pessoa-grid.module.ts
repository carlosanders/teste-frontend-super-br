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
import { ModalidadeGeneroPessoaService } from '@cdk/services/modalidade-genero-pessoa.service';
import { CdkModalidadeGeneroPessoaGridComponent} from './cdk-modalidade-genero-pessoa-grid.component';
import { CdkModalidadeGeneroPessoaGridFilterComponent } from './cdk-modalidade-genero-pessoa-grid-filter/cdk-modalidade-genero-pessoa-grid-filter.component';
import { CdkModalidadeGeneroPessoaAutocompleteModule } from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeGeneroPessoaGridComponent,
        CdkModalidadeGeneroPessoaGridFilterComponent
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

        CdkModalidadeGeneroPessoaAutocompleteModule,

        FuseSharedModule,
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
