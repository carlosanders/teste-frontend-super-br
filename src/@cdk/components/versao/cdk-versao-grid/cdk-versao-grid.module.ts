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

import {CdkSharedModule} from '@cdk/shared.module';
import {LogEntryService} from '@cdk/services/logentry.service';
import {CdkVersaoGridComponent} from './cdk-versao-grid.component';
import {CdkSidebarModule} from '@cdk/components/index';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkVersaoGridComponent,
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
