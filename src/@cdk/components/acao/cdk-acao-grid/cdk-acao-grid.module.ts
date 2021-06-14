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
import {CdkAcaoGridComponent} from './cdk-acao-grid.component';
import {CdkAcaoFilterModule} from '../sidebars/cdk-acao-filter/cdk-acao-filter.module';
import {CdkSidebarModule} from '../..';

@NgModule({
    declarations: [
        CdkAcaoGridComponent,
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
        CdkAcaoFilterModule,
        CdkSidebarModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkAcaoGridComponent
    ]
})
export class CdkAcaoGridModule {
}
