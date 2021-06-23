import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {UsuariosExternosEditComponent} from './usuarios-externos-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkUsuarioFormModule} from '@cdk/components/usuario/cdk-usuario-form/cdk-usuario-form.module';
import {CdkColaboradorFormModule} from '@cdk/components/colaborador/cdk-colaborador-form/cdk-colaborador-form.module';
import {UsuarioService} from '@cdk/services/usuario.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {UsuariosExternosEditStoreModule} from './store/store.module';
import {MatStepperModule} from '@angular/material/stepper';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':usuariosExternosHandle',
        component: UsuariosExternosEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/usuarios-externos/usuarios-externos-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        UsuariosExternosEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkUsuarioFormModule,
        CdkColaboradorFormModule,

        UsuariosExternosEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        PathModule,
    ],
    providers: [
        UsuarioService,
        fromGuards.ResolveGuard
    ]
})
export class UsuariosExternosEditModule {
}
