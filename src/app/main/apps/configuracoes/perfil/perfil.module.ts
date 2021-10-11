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

import {PerfilComponent} from './perfil.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkPerfilFormModule} from '@cdk/components/usuario/cdk-perfil-form/cdk-perfil-form.module';
import {ProfileStoreModule} from './store/store.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '../../../../../@cdk/components/path/path.module';
import {ImageCropperModule} from 'ngx-image-cropper';

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
        ImageCropperModule,

        CdkPerfilFormModule,

        ProfileStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        UsuarioService
    ]
})
export class PerfilModule {
}
