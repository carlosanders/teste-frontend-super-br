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
import {CdkUnidadeFormModule} from '@cdk/components/unidade/cdk-unidade-form/cdk-unidade-form.module';
import {UnidadeEditComponent} from './unidade-edit.component';
import {UnidadeEditStoreModule} from './store/store.module';
import {SetorService} from '@cdk/services/setor.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':unidadeHandle',
        component: UnidadeEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        UnidadeEditComponent
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

        CdkUnidadeFormModule,

        UnidadeEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers: [
        SetorService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class UnidadeEditModule {
}
