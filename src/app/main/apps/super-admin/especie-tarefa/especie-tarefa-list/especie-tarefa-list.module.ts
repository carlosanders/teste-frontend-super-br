import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieTarefaListComponent} from './especie-tarefa-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {EspecieTarefaStoreModule} from './store/store.module';
import {EspecieTarefaService} from '../../../../../../@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaGridModule} from '../../../../../../@cdk/components/especie-tarefa/cdk-especie-tarefa-grid/cdk-especie-tarefa-grid.module';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

const routes: Routes = [
    {
        path: '',
        component: EspecieTarefaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [EspecieTarefaListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EspecieTarefaStoreModule,
        CdkEspecieTarefaGridModule,

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatDatepickerModule,
        MatDialogModule
    ],
    providers: [
        LoginService,
        fromGuards.ResolveGuard,
        EspecieTarefaService
    ]
})
export class EspecieTarefaListModule {
}
