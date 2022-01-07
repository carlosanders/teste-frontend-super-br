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
import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {CdkVinculacaoEspecieProcessoWorkflowGridComponent} from './cdk-vinculacao-especie-processo-workflow-grid.component';
import {CdkVinculacaoEspecieProcessoWorkflowAutocompleteModule} from '@cdk/components/vinculacao-especie-processo-workflow/cdk-vinculacao-especie-processo-workflow-autocomplete/cdk-vinculacao-especie-processo-workflow-autocomplete.module';
import {CdkVinculacaoEspecieProcessoWorkflowFilterModule} from '../sidebars/cdk-vinculacao-especie-processo-workflow-filter/cdk-vinculacao-especie-processo-workflow-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoEspecieProcessoWorkflowGridComponent,
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
        CdkVinculacaoEspecieProcessoWorkflowAutocompleteModule,
        CdkVinculacaoEspecieProcessoWorkflowFilterModule,
        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoEspecieProcessoWorkflowService,
    ],
    exports: [
        CdkVinculacaoEspecieProcessoWorkflowGridComponent
    ]
})
export class CdkVinculacaoEspecieProcessoWorkflowGridModule {
}
