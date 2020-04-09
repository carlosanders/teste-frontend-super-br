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

import {CdkSharedModule} from '@cdk/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkLogentryGridComponent} from './cdk-logentry-grid.component';
import {CdkLogentryGridFilterModule} from '../sidebars/cdk-logentry-grid-filter/cdk-logentry-grid-filter.module';
import {CdkLogentryMainSidebarComponent} from './main/main.component';
import {CdkSidebarModule} from '@cdk/components/index';
import {MatTooltipModule} from '@angular/material/tooltip';


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

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
