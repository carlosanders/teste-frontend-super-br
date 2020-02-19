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
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkVersaoGridComponent} from './cdk-versao-grid.component';
import {FuseSidebarModule} from '@fuse/components';
import {CdkVersaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVersaoGridComponent,
        CdkVersaoMainSidebarComponent,
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
        FuseSidebarModule,
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
