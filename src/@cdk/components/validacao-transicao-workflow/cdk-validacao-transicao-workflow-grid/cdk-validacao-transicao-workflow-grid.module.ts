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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkValidacaoTransicaoWorkflowGridComponent} from './cdk-validacao-transicao-workflow-grid.component';
import {CdkValidacaoTransicaoWorkflowFilterModule} from '../sidebars/cdk-validacao-transicao-workflow-filter/cdk-validacao-transicao-workflow-filter.module';
import {CdkSidebarModule} from '../..';

@NgModule({
    declarations: [
        CdkValidacaoTransicaoWorkflowGridComponent,
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
        MatTooltipModule,
        MatSelectModule,
        CdkValidacaoTransicaoWorkflowFilterModule,
        CdkSidebarModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkValidacaoTransicaoWorkflowGridComponent
    ]
})
export class CdkValidacaoTransicaoWorkflowGridModule {
}
