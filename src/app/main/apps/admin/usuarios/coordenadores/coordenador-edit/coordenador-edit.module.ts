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

import {CoordenadorEditComponent} from './coordenador-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminCoordenadorEditStoreModule} from './store/store.module';
import {CoordenadorService} from '@cdk/services/coordenador.service';

import * as fromGuards from './store/guards';

import {CdkCoordenadorFormModule} from '@cdk/components/coordenador/cdk-coordenador-form/cdk-coordenador-form.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':coordenadorHandle',
        component: CoordenadorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        CoordenadorEditComponent
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

        AdminCoordenadorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkCoordenadorFormModule,
        PathModule,
    ],
    providers: [
        CoordenadorService,
        fromGuards.ResolveGuard
    ]
})
export class CoordenadorEditModule {
}
