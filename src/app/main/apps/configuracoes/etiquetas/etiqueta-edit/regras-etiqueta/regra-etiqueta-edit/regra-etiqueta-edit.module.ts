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

import {RegraEtiquetaEditComponent} from './regra-etiqueta-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRegraEtiquetaFormModule} from '@cdk/components/regra-etiqueta/cdk-regra-etiqueta-form/cdk-regra-etiqueta-form.module';
import {RegraEtiquetaEditStoreModule} from './store/store.module';

import * as fromGuards from './store/guards';
import {LoginService} from 'app/main/auth/login/login.service';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':regraEtiquetaHandle',
        component: RegraEtiquetaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/regras-etiqueta/regra-etiqueta-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RegraEtiquetaEditComponent
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

        CdkRegraEtiquetaFormModule,

        RegraEtiquetaEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkRegraEtiquetaFormModule,
        PathModule,
    ],
    providers: [
        RegraEtiquetaService,
        fromGuards.ResolveGuard
    ]
})
export class RegraEtiquetaEditModule {
}
