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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCargoGridComponent} from './cdk-cargo-grid.component';
import {CdkCargoGridFilterModule} from '../sidebars/cdk-cargo-grid-filter/cdk-cargo-grid-filter.module';
import {CdkCargoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkCargoGridComponent,
        CdkCargoMainSidebarComponent,
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

        CdkCargoGridFilterModule,

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
