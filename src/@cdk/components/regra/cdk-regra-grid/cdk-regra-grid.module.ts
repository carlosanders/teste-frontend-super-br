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
import {RegraService} from '@cdk/services/regra.service';
import {CdkRegraGridComponent} from './cdk-regra-grid.component';
import {CdkRegraFilterModule} from '../sidebars/cdk-regra-filter/cdk-regra-filter.module';
import {CommonModule} from '@angular/common';
import {CdkSidebarModule} from '@cdk/components/index';

@NgModule({
    declarations: [
        CdkRegraGridComponent,
    ],
    imports: [
        CommonModule,

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
        RegraService,
    ],
    exports: [
        CdkRegraGridComponent
    ]
})
export class CdkRegraGridModule {
}
