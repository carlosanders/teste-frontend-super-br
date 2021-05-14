import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {UsuarioEditComponent} from './usuario-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkUsuarioFormModule} from '@cdk/components/usuario/cdk-usuario-form/cdk-usuario-form.module';
import {CdkColaboradorFormModule} from '@cdk/components/colaborador/cdk-colaborador-form/cdk-colaborador-form.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {UsuarioEditStoreModule} from './store/store.module';
import {MatStepperModule} from '@angular/material/stepper';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':usuarioHandle',
        component: UsuarioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


const path = 'app/main/apps/coordenador/usuarios/usuario-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
}); @NgModule({
    declarations: [
        UsuarioEditComponent
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

        UsuarioEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        PathModule,
    ],
    providers: [
        UsuarioService,
        ColaboradorService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class UsuarioEditModule {
}
