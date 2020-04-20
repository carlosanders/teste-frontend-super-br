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

import {ModelosEditComponent} from './modelos-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkModeloFormModule} from '@cdk/components/modelo/cdk-modelo-form/cdk-modelo-form.module';
import {ModeloEditStoreModule} from './store/store.module';
import {ModeloService} from '@cdk/services/modelo.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':modeloHandle',
        component: ModelosEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ModelosEditComponent
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
        CdkModeloFormModule,
        ModeloEditStoreModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModeloService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class ModelosEditModule {
}