import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuariosExternosListComponent} from './usuarios-externos-list.component';
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
import {UsuarioService} from '@cdk/services/usuario.service';
import {UsuariosExternosStoreModule} from './store/store.module';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkUsuarioGridModule} from '@cdk/components/usuario/cdk-usuario-grid/cdk-usuario-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: UsuariosExternosListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/usuarios-externos/usuarios-externos-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [UsuariosExternosListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UsuariosExternosStoreModule,

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
        CdkUsuarioGridModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        UsuarioService
    ]
})
export class UsuariosExternosListModule {
}
