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
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoGridComponent} from './cdk-modalidade-vinculacao-processo-grid.component';
import {CdkModalidadeVinculacaoProcessoAutocompleteModule} from '@cdk/components/modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-autocomplete/cdk-modalidade-vinculacao-processo-autocomplete.module';
import {CdkModalidadeVinculacaoProcessoFilterModule} from '../sidebars/cdk-modalidade-vinculacao-processo-filter/cdk-modalidade-vinculacao-processo-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoGridComponent,
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

        CdkModalidadeVinculacaoProcessoAutocompleteModule,
        CdkModalidadeVinculacaoProcessoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeVinculacaoProcessoService,
    ],
    exports: [
        CdkModalidadeVinculacaoProcessoGridComponent
    ]
})
export class CdkModalidadeVinculacaoProcessoGridModule {
}
