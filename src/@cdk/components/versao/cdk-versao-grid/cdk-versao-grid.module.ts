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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkVersaoGridComponent} from './cdk-versao-grid.component';

@NgModule({
    declarations: [
        CdkVersaoGridComponent
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
        FuseSharedModule,
    ],
    providers: [
        LogEntryService,
    ],
    exports: [
        CdkVersaoGridComponent
    ]
})
export class CdkVersaoGridModule {
}
