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
    MatSelectModule,
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkLogentryGridComponent} from './cdk-logentry-grid.component';
import {CdkLogentryGridFilterModule} from './cdk-logentry-grid-filter/cdk-logentry-grid-filter.module';
import {CdkLogentryMainSidebarComponent} from './main/main.component';
import {FuseSidebarModule} from '@fuse/components';


@NgModule({
    declarations: [
        CdkLogentryGridComponent,
        CdkLogentryMainSidebarComponent,
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

        CdkLogentryGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        LogEntryService,
    ],
    exports: [
        CdkLogentryGridComponent
    ]
})
export class CdkLogentryGridModule {
}
