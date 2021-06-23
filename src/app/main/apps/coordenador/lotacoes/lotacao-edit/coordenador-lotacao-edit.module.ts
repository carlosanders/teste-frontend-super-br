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

import {CoordenadorLotacaoEditComponent} from './coordenador-lotacao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CoordenadorLotacaoEditStoreModule} from './store/store.module';
import {LotacaoService} from '@cdk/services/lotacao.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkLotacaoFormModule} from '@cdk/components/lotacao/cdk-lotacao-form/cdk-lotacao-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':lotacaoHandle',
        component: CoordenadorLotacaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/lotacoes/lotacao-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CoordenadorLotacaoEditComponent
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

        CdkLotacaoFormModule,

        CoordenadorLotacaoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        LotacaoService,
        fromGuards.ResolveGuard
    ]
})
export class CoordenadorLotacaoEditModule {
}
