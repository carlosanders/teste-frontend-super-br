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

import {RegraEditComponent} from './regra-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRegraFormModule} from '@cdk/components/regra/cdk-regra-form/cdk-regra-form.module';
import {RegraEditStoreModule} from './store/store.module';

import * as fromGuards from './store/guards';
import {LoginService} from 'app/main/auth/login/login.service';
import {RegraService} from '@cdk/services/regra.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':regraHandle',
        component: RegraEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/acoes/regra-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RegraEditComponent
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

        CdkRegraFormModule,

        RegraEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkRegraFormModule,
    ],
    providers: [
        RegraService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class RegraEditModule {
}
