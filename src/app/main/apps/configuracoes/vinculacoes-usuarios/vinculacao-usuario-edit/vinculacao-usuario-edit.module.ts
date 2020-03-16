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

import {VinculacaoUsuarioEditComponent} from './vinculacao-usuario-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkVinculacaoUsuarioFormModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-form/cdk-vinculacao-usuario-form.module';
import {VinculacaoUsuarioEditStoreModule} from './store/store.module';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':vinculacaoUsuarioHandle',
        component: VinculacaoUsuarioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VinculacaoUsuarioEditComponent
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

        CdkVinculacaoUsuarioFormModule,

        VinculacaoUsuarioEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoUsuarioService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class VinculacaoUsuarioEditModule {
}
