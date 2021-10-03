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
import {CdkContaEmailFilterModule} from '../sidebars/cdk-conta-email-filter/cdk-conta-email-filter.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CdkContaEmailGridComponent} from './cdk-conta-email-grid.component';
import {ContaEmailService} from '../../../services/conta-email.service';

@NgModule({
    declarations: [
        CdkContaEmailGridComponent,
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
        MatTooltipModule,
        MatSelectModule,
        MatDialogModule,
        MatDatepickerModule,

        CdkContaEmailFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule
    ],
    providers: [
        ContaEmailService
    ],
    exports: [
        CdkContaEmailGridComponent
    ]
})
export class CdkContaEmailGridModule {
}
