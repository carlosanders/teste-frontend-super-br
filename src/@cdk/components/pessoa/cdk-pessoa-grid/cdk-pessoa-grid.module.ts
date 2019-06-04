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
import { PessoaService } from '@cdk/services/pessoa.service';
import { CdkPessoaGridComponent} from './cdk-pessoa-grid.component';
import { CdkPessoaGridFilterComponent } from './cdk-pessoa-grid-filter/cdk-pessoa-grid-filter.component';
import { CdkPessoaAutocompleteModule } from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';

@NgModule({
    declarations: [
        CdkPessoaGridComponent,
        CdkPessoaGridFilterComponent
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

        CdkPessoaAutocompleteModule,

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
