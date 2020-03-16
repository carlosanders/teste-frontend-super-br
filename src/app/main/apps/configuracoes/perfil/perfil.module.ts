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


const routes: Routes = [
    {
        path: '',
        component: PerfilComponent,
    }
];

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
    ],
    providers: [
        LoginService,
        UsuarioService
    ]
})
export class PerfilModule {
}
