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

import {RepositorioEditComponent} from './repositorio-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRepositorioFormModule} from '@cdk/components/repositorio/cdk-repositorio-form/cdk-repositorio-form.module';
import {RepositorioEditStoreModule} from './store/store.module';
import {RepositorioService} from '@cdk/services/repositorio.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':repositorioHandle',
        component: RepositorioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RepositorioEditComponent
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

        CdkRepositorioFormModule,

        RepositorioEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        RepositorioService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class RepositorioEditModule {
}
