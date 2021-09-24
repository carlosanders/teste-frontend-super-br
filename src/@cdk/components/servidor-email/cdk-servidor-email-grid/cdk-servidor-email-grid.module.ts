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
import {CdkServidorEmailFilterModule} from '../sidebars/cdk-servidor-email-filter/cdk-servidor-email-filter.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CdkServidorEmailAutocompleteModule} from '../cdk-servidor-email-autocomplete/cdk-servidor-email-autocomplete.module';
import {CdkServidorEmailGridComponent} from './cdk-servidor-email-grid.component';
import {ServidorEmailService} from '../../../services/servidor-email.service';

@NgModule({
    declarations: [
        CdkServidorEmailGridComponent,
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

        CdkServidorEmailAutocompleteModule,
        CdkServidorEmailFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule
    ],
    providers: [
        ServidorEmailService
    ],
    exports: [
        CdkServidorEmailGridComponent
    ]
})
export class CdkServidorEmailGridModule {
}
