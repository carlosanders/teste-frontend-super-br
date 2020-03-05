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

import {SetorEditComponent} from './setor-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkSetorFormModule} from '@cdk/components/setor/cdk-setor-form/cdk-setor-form.module';
import {SetorEditStoreModule} from './store/store.module';
import {SetorService} from '@cdk/services/setor.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':setorHandle',
        component: SetorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        SetorEditComponent
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

        CdkSetorFormModule,

        SetorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        SetorService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class SetorEditModule {
}
