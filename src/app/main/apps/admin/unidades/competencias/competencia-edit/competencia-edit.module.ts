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

import {RouterModule, Routes} from '@angular/router';
import {CompetenciaEditComponent} from './competencia-edit.component';
import {CompetenciaEditStoreModule} from './store/store.module';
import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';

import * as fromGuards from './store/guards';
import {CdkVinculacaoSetorMunicipioFormModule} from '@cdk/components/vinculacao-setor-municipio/cdk-vinculacao-setor-municipio-form/cdk-vinculacao-setor-municipio-form.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':competenciaHandle',
        component: CompetenciaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/unidades/competencias/competencia-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CompetenciaEditComponent
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

        CdkVinculacaoSetorMunicipioFormModule,

        CompetenciaEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule
    ],
    providers: [
        VinculacaoSetorMunicipioService,
        fromGuards.ResolveGuard
    ]
})
export class CompetenciaEditModule {
}
