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
    MatDialogModule,
    MatDatepickerModule,
} from '@cdk/angular/material';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkModuloGridComponent} from './cdk-modulo-grid.component';
import {CdkModuloAutocompleteModule} from '../cdk-modulo-autocomplete/cdk-modulo-autocomplete.module';
import {CdkModuloFilterModule} from '../sidebars/cdk-modulo-filter/cdk-modulo-filter.module';
import {ModuloService} from '../../../services/modulo.service';

@NgModule({
    declarations: [CdkModuloGridComponent],
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
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkModuloAutocompleteModule,
        CdkModuloFilterModule,
    ],
    providers: [ModuloService],
    exports: [CdkModuloGridComponent]
})
export class CdkModuloGridModule { }
