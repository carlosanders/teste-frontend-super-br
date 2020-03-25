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
import {CoordenadorEspecieSetorEditStoreModule} from './store/store.module';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkModeloVinculacaoEspecieSetorModule} from '@cdk/components/modelo/cdk-modelo-vinculacao-especie-setor/cdk-modelo-vinculacao-especie-setor.module';

const routes: Routes = [
    {
        path: ':especieSetorHandle',
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

        CoordenadorEspecieSetorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkModeloVinculacaoEspecieSetorModule,
    ],
    providers: [
        EspecieSetorService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class EspecieSetorEditModule {
}
