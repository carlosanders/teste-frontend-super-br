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
import {VinculacaoTransicaoWorkflowService} from '@cdk/services/vinculacao-transicao-workflow.service';
import {CdkVinculacaoTransicaoWorkflowGridComponent} from './cdk-vinculacao-transicao-workflow-grid.component';
import {CdkVinculacaoTransicaoWorkflowAutocompleteModule} from '@cdk/components/vinculacao-transicao-workflow/cdk-vinculacao-transicao-workflow-autocomplete/cdk-vinculacao-transicao-workflow-autocomplete.module';
import {CdkVinculacaoTransicaoWorkflowFilterModule} from '../sidebars/cdk-vinculacao-transicao-workflow-filter/cdk-vinculacao-transicao-workflow-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoTransicaoWorkflowGridComponent,
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
        CdkVinculacaoTransicaoWorkflowAutocompleteModule,
        CdkVinculacaoTransicaoWorkflowFilterModule,
        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoTransicaoWorkflowService,
    ],
    exports: [
        CdkVinculacaoTransicaoWorkflowGridComponent
    ]
})
export class CdkVinculacaoTransicaoWorkflowGridModule {
}
