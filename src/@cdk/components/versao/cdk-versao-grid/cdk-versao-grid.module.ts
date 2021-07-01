import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkVersaoGridComponent} from './cdk-versao-grid.component';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkVersaoMainSidebarComponent} from '../sidebars/main/main.component';
import {MatTooltipModule} from '@angular/material/tooltip';

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

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
