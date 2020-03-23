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

import {EspecieSetorEditComponent} from './especie-setor-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CoordenadorAfastamentoEditStoreModule} from './store/store.module';
import {AfastamentoService} from '@cdk/services/afastamento.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkAfastamentoFormModule} from '@cdk/components/afastamento/cdk-afastamento-form/cdk-afastamento-form.module';

const routes: Routes = [
    {
        path: ':afastamentoHandle',
        component: EspecieSetorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        EspecieSetorEditComponent
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

        CoordenadorAfastamentoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkAfastamentoFormModule,
    ],
    providers: [
        AfastamentoService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class EspecieSetorEditModule {
}
