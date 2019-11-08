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
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkCargoGridComponent} from './cdk-cargo-grid.component';
import {CdkCargoGridFilterModule} from './cdk-cargo-grid-filter/cdk-cargo-grid-filter.module';
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

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [],
    exports: [
        CdkCargoGridComponent
    ]
})
export class CdkCargoGridModule {
}
