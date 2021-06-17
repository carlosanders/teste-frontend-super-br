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
import {CdkCargoGridComponent} from './cdk-cargo-grid.component';
import {CdkCargoFilterModule} from '../sidebars/cdk-cargo-filter/cdk-cargo-filter.module';

@NgModule({
    declarations: [
        CdkCargoGridComponent,
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

        CdkCargoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [],
    exports: [
        CdkCargoGridComponent
    ]
})
export class CdkCargoGridModule {
}
