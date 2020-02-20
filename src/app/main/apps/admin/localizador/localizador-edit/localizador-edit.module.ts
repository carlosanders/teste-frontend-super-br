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

import {LocalizadorEditComponent} from './localizador-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkLocalizadorFormModule} from '@cdk/components/localizador/cdk-localizador-form/cdk-localizador-form.module';
import {LocalizadorEditStoreModule} from './store/store.module';
import {LocalizadorService} from '@cdk/services/localizador.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':localizadorHandle',
        component: LocalizadorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        LocalizadorEditComponent
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

        CdkLocalizadorFormModule,

        LocalizadorEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        LocalizadorService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class LocalizadorEditModule {
}
