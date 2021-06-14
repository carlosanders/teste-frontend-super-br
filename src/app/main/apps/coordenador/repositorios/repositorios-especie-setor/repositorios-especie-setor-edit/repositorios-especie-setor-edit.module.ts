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

import {RepositoriosEspecieSetorEditComponent} from './repositorios-especie-setor-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {RepositoriosEspecieSetorEditStoreModule} from './store/store.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';

import * as fromGuards from './store/guards';
import {CdkVinculacaoRepositorioEspecieSetorFormModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-especie-setor-form/cdk-vinculacao-repositorio-especie-setor-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':repositorioEspecieSetorHandle',
        component: RepositoriosEspecieSetorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/repositorios/repositorios-especie-setor/repositorios-especie-setor-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositoriosEspecieSetorEditComponent
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

        RepositoriosEspecieSetorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkVinculacaoRepositorioEspecieSetorFormModule,
        PathModule,
    ],
    providers: [
        VinculacaoRepositorioService,
        fromGuards.ResolveGuard
    ]
})
export class RepositoriosEspecieSetorEditModule {
}
