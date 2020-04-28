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

import {RouterModule, Routes} from '@angular/router';
import {CompetenciaEditComponent} from './competencia-edit.component';
import {CompetenciaEditStoreModule} from './store/store.module';
import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';

import * as fromGuards from './store/guards';
import {CdkVinculacaoSetorMunicipioFormModule} from '@cdk/components/vinculacao-setor-municipio/cdk-vinculacao-setor-municipio-form/cdk-vinculacao-setor-municipio-form.module';
import {LoginService} from '../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':competenciaHandle',
        component: CompetenciaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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
        CdkSidebarModule
    ],
    providers: [
        VinculacaoSetorMunicipioService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class CompetenciaEditModule {
}
