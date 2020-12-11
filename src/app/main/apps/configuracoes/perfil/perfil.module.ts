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

import {PerfilComponent} from './perfil.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkPerfilFormModule} from '@cdk/components/usuario/cdk-perfil-form/cdk-perfil-form.module';
import {ProfileStoreModule} from './store/store.module';
import {LoginService} from '../../../auth/login/login.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '../../../../../@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: PerfilComponent,
    }
];

const path = 'app/main/apps/configuracoes/perfil';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        PerfilComponent
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

        CdkPerfilFormModule,

        ProfileStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        LoginService,
        UsuarioService
    ]
})
export class PerfilModule {
}
