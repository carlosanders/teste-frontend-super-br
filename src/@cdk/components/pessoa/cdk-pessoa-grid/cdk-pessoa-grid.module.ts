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

import { FuseSharedModule } from '@fuse/shared.module';
import { PessoaService } from '@cdk/services/pessoa.service';
import { CdkPessoaGridComponent} from './cdk-pessoa-grid.component';
import { CdkPessoaAutocompleteModule } from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaGridFilterModule} from './cdk-pessoa-grid-filter/cdk-pessoa-grid-filter.module';

@NgModule({
    declarations: [
        CdkPessoaGridComponent
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

        CdkPessoaAutocompleteModule,
        CdkPessoaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        PessoaService,
    ],
    exports: [
        CdkPessoaGridComponent
    ]
})
export class CdkPessoaGridModule {
}
