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

import {ModelosEspecieSetorEditComponent} from './modelos-especie-setor-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ModelosEspecieSetorEditStoreModule} from './store/store.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';

import * as fromGuards from './store/guards';
import {CdkVinculacaoModeloEspecieSetorFormModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-especie-setor-form/cdk-vinculacao-modelo-especie-setor-form.module';

const routes: Routes = [
    {
        path: ':modeloEspecieSetorHandle',
        component: ModelosEspecieSetorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ModelosEspecieSetorEditComponent
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

        ModelosEspecieSetorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkVinculacaoModeloEspecieSetorFormModule,
    ],
    providers: [
        VinculacaoModeloService,
        fromGuards.ResolveGuard
    ]
})
export class ModelosEspecieSetorEditModule {
}
