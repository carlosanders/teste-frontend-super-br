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

import {ModelosEspecieSetorEditComponent} from './modelos-especie-setor-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ModelosEspecieSetorEditStoreModule} from './store/store.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';

import * as fromGuards from './store/guards';
import {CdkVinculacaoModeloEspecieSetorFormModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-especie-setor-form/cdk-vinculacao-modelo-especie-setor-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':modeloEspecieSetorHandle',
        component: ModelosEspecieSetorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/modelos/modelos-especie-setor/modelos-especie-setor-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
        PathModule,
    ],
    providers: [
        VinculacaoModeloService,
        fromGuards.ResolveGuard
    ]
})
export class ModelosEspecieSetorEditModule {
}
