import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuariosExternosListComponent} from './usuarios-externos-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from '../../especie-tarefa/especie-tarefa-list/store/guards';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
    {
        path: '',
        component: UsuariosExternosListComponent,
        // canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [UsuariosExternosListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),


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
    ]
})
export class UsuariosExternosListModule {
}
