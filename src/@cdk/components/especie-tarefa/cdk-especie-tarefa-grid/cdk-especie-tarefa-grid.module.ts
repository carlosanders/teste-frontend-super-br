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
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaGridComponent} from './cdk-especie-tarefa-grid.component';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieTarefaFilterModule} from '../sidebars/cdk-especie-tarefa-filter/cdk-especie-tarefa-filter.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridComponent,
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

        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieTarefaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule
    ],
    providers: [
        EspecieTarefaService
    ],
    exports: [
        CdkEspecieTarefaGridComponent
    ]
})
export class CdkEspecieTarefaGridModule {
}
