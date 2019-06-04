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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {PerfilComponent} from './perfil.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkPerfilFormModule} from '@cdk/components/perfil/cdk-perfil-form/cdk-perfil-form.module';
import {ProfileStoreModule} from './store/store.module';
import {LoginService} from '../../../auth/login/login.service';


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

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        LoginService
    ]
})
export class PerfilModule {
}
