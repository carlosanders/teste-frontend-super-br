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
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {CdkTransicaoWorkflowAutocompleteModule} from '@cdk/components/transicao-workflow/cdk-transicao-workflow-autocomplete/cdk-transicao-workflow-autocomplete.module';
import {CdkTransicaoWorkflowFilterModule} from '@cdk/components/transicao-workflow/sidebars/cdk-transicao-workflow-filter/cdk-transicao-workflow-filter.module';
import {CdkTransicaoWorkflowGridComponent} from './cdk-transicao-workflow-grid.component';

@NgModule({
    declarations: [
        CdkTransicaoWorkflowGridComponent,
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
        MatTooltipModule,

        CdkTransicaoWorkflowFilterModule,
        CdkTransicaoWorkflowAutocompleteModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTableModule,
    ],
    providers: [
        TransicaoWorkflowService,
    ],
    exports: [
        CdkTransicaoWorkflowGridComponent
    ]
})
export class CdkTransicaoWorkflowGridModule {
}
