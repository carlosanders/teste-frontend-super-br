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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkLogentryGridComponent} from './cdk-logentry-grid.component';
import {CdkLogentryGridFilterModule} from './cdk-logentry-grid-filter/cdk-logentry-grid-filter.module';

@NgModule({
    declarations: [
        CdkLogentryGridComponent
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
