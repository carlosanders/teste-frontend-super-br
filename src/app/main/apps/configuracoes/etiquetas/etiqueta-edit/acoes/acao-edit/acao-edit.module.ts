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

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {AcaoEditComponent} from './acao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAcaoFormModule} from '@cdk/components/acao/cdk-acao-form/cdk-acao-form.module';
import {AcaoEditStoreModule} from './store/store.module';

import * as fromGuards from './store/guards';
import {LoginService} from 'app/main/auth/login/login.service';
import {AcaoService} from '@cdk/services/acao.service';

const routes: Routes = [
    {
        path: ':acaoHandle',
        component: AcaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        AcaoService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class AcaoEditModule {
}
