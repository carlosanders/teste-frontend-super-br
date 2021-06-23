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

import {ContatoEditComponent} from './contato-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkContatoFormModule} from '@cdk/components/contato/cdk-contato-form/cdk-contato-form.module';
import {ContatoEditStoreModule} from './store/store.module';
import {ContatoService} from '@cdk/services/contato.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':contatoHandle',
        component: ContatoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/grupo-contato/contato/contato-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ContatoEditComponent
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

        CdkContatoFormModule,

        ContatoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        ContatoService,
        fromGuards.ResolveGuard
    ]
})
export class ContatoEditModule {
}
