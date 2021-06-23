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
import {CdkVinculacaoPessoaBarramentoGridComponent} from './cdk-vinculacao-pessoa-barramento-grid.component';
import {CdkVinculacaoPessoaBarramentoFilterModule} from '../sidebars/cdk-vinculacao-pessoa-barramento-filter/cdk-vinculacao-pessoa-barramento-filter.module';
import {CdkVinculacaoPessoaBarramentoAutocompleteModule} from "../cdk-vinculacao-pessoa-barramento-autocomplete/cdk-vinculacao-pessoa-barramento-autocomplete.module";
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";

@NgModule({
    declarations: [
        CdkVinculacaoPessoaBarramentoGridComponent,
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

        CdkVinculacaoPessoaBarramentoAutocompleteModule,
        CdkVinculacaoPessoaBarramentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService,
    ],
    exports: [
        CdkVinculacaoPessoaBarramentoGridComponent
    ]
})
export class CdkVinculacaoPessoaBarramentoGridModule {
}
