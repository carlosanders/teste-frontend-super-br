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

import {AcaoEditComponent} from './acao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAcaoFormModule} from '@cdk/components/acao/cdk-acao-form/cdk-acao-form.module';
import {AcaoEditStoreModule} from './store/store.module';

import * as fromGuards from './store/guards';
import {LoginService} from 'app/main/auth/login/login.service';
import {AcaoService} from '@cdk/services/acao.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '../../../../../../../../@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':acaoHandle',
        component: AcaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/etiquetas/etiqueta-edit/acoes/acao-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoEditComponent
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

        CdkAcaoFormModule,

        AcaoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        AcaoService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class AcaoEditModule {
}
