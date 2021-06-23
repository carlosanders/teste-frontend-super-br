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

import {RepositorioEditComponent} from './repositorio-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRepositorioFormModule} from '@cdk/components/repositorio/cdk-repositorio-form/cdk-repositorio-form.module';
import {RepositorioEditStoreModule} from './store/store.module';
import {RepositorioService} from '@cdk/services/repositorio.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':repositorioHandle',
        component: RepositorioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/repositorios/repositorio-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositorioEditComponent
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

        CdkRepositorioFormModule,

        RepositorioEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        RepositorioService,
        fromGuards.ResolveGuard
    ]
})
export class RepositorioEditModule {
}
