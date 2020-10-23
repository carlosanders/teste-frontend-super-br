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
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRegraGridComponent} from './cdk-regra-grid.component';
import {CdkRegraFilterModule} from '../sidebars/cdk-regra-filter/cdk-regra-filter.module';
import {CdkSidebarModule} from '../..';

@NgModule({
    declarations: [
        CdkRegraGridComponent,
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
        CdkRegraFilterModule,
        CdkSidebarModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkRegraGridComponent
    ]
})
export class CdkRegraGridModule {
}
