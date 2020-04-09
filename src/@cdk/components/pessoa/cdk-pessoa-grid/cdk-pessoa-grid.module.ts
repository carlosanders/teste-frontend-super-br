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
import {PessoaService} from '@cdk/services/pessoa.service';
import {CdkPessoaGridComponent} from './cdk-pessoa-grid.component';
import {CdkPessoaAutocompleteModule} from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaFilterModule} from '../sidebars/cdk-pessoa-filter/cdk-pessoa-filter.module';
import {CdkPessoaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkPessoaGridComponent,
        CdkPessoaMainSidebarComponent,
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
        CdkPessoaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
