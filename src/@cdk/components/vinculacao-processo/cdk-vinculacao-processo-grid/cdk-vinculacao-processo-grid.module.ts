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
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {CdkVinculacaoProcessoGridComponent} from './cdk-vinculacao-processo-grid.component';
import {CdkVinculacaoProcessoAutocompleteModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-autocomplete/cdk-vinculacao-processo-autocomplete.module';
import {CdkVinculacaoProcessoFilterModule} from '../sidebars/cdk-vinculacao-processo-filter/cdk-vinculacao-processo-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkVinculacaoProcessoAutocompleteModule,
        CdkVinculacaoProcessoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoProcessoService,
    ],
    exports: [
        CdkVinculacaoProcessoGridComponent
    ]
})
export class CdkVinculacaoProcessoGridModule {
}
