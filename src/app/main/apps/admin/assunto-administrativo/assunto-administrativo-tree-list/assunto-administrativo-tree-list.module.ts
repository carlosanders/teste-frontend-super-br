import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssuntoAdministrativoTreeListComponent} from './assunto-administrativo-tree-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginService} from '../../../../auth/login/login.service';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {AssuntoAdministrativoTreeStoreModule} from './store/store.module';
import {CdkAssuntoAdministrativoTreeModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-tree/cdk-assunto-administrativo-tree.module';
import {CdkAssuntoAdministrativoTreeService} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-tree/services/cdk-assunto-administrativo-tree.service';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: AssuntoAdministrativoTreeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [AssuntoAdministrativoTreeListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AssuntoAdministrativoTreeStoreModule,


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
        MatDialogModule,
        CdkAssuntoAdministrativoTreeModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        AssuntoAdministrativoService,
        CdkAssuntoAdministrativoTreeService
    ]
})
export class AssuntoAdministrativoTreeListModule {
}
