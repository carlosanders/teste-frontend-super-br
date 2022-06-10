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
import {CdkConfigModuloGridComponent} from './cdk-config-modulo-grid.component';
import {CdkConfigModuloAutocompleteModule} from '../cdk-config-modulo-autocomplete/cdk-config-modulo-autocomplete.module';
import {CdkConfigModuloFilterModule} from '../sidebars/cdk-config-modulo-filter/cdk-config-modulo-filter.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ConfigModuloService} from '../../../services/config-modulo.service';

@NgModule({
    declarations: [CdkConfigModuloGridComponent],
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
        CdkConfigModuloAutocompleteModule,
        CdkConfigModuloFilterModule,
        MatSlideToggleModule,
    ],
    providers: [ConfigModuloService],
    exports: [CdkConfigModuloGridComponent]
})
export class CdkConfigModuloGridModule { }
