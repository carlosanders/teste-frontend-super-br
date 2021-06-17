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
import {CdkAcaoTransicaoWorkflowGridComponent} from './cdk-acao-transicao-workflow-grid.component';
import {CdkAcaoTransicaoWorkflowFilterModule} from '../sidebars/cdk-acao-transicao-workflow-filter/cdk-acao-transicao-workflow-filter.module';
import {CdkSidebarModule} from '../..';

@NgModule({
    declarations: [
        CdkAcaoTransicaoWorkflowGridComponent,
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
        CdkAcaoTransicaoWorkflowFilterModule,
        CdkSidebarModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkAcaoTransicaoWorkflowGridComponent
    ]
})
export class CdkAcaoTransicaoWorkflowGridModule {
}
