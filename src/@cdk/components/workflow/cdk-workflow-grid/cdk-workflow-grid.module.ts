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
import {WorkflowService} from '@cdk/services/workflow.service';
import {CdkWorkflowGridComponent} from './cdk-workflow-grid.component';
import {CdkWorkflowAutocompleteModule} from '@cdk/components/workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';
import {CdkWorkflowFilterModule} from '@cdk/components/workflow/sidebars/cdk-workflow-filter/cdk-workflow-filter.module';

@NgModule({
    declarations: [
        CdkWorkflowGridComponent,
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

        CdkWorkflowFilterModule,
        CdkWorkflowAutocompleteModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTableModule,
    ],
    providers: [
        WorkflowService,
    ],
    exports: [
        CdkWorkflowGridComponent
    ]
})
export class CdkWorkflowGridModule {
}
