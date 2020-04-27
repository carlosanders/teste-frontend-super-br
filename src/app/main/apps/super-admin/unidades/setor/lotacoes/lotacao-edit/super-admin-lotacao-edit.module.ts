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

import {SuperAdminLotacaoEditComponent} from './super-admin-lotacao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {SuperAdminLotacaoEditStoreModule} from './store/store.module';
import {LotacaoService} from '@cdk/services/lotacao.service';

import * as fromGuards from './store/guards';
import {CdkLotacaoFormModule} from '@cdk/components/lotacao/cdk-lotacao-form/cdk-lotacao-form.module';
import {LoginService} from '../../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':lotacaoHandle',
        component: SuperAdminLotacaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        SuperAdminLotacaoEditComponent
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

        SuperAdminLotacaoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        LotacaoService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class SuperAdminLotacaoEditModule {
}
