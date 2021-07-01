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
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeGridComponent} from './cdk-especie-atividade-grid.component';
import {CdkEspecieAtividadeAutocompleteModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkEspecieAtividadeFilterModule} from '../sidebars/cdk-especie-atividade-filter/cdk-especie-atividade-filter.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridComponent,
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

        CdkEspecieAtividadeAutocompleteModule,
        CdkEspecieAtividadeFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule
    ],
    providers: [
        EspecieAtividadeService
    ],
    exports: [
        CdkEspecieAtividadeGridComponent
    ]
})
export class CdkEspecieAtividadeGridModule {
}
