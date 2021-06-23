import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RepositoriosEspecieSetorListComponent} from './repositorios-especie-setor-list.component';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkVinculacaoRepositorioGridModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-grid/cdk-vinculacao-repositorio-grid.module';
import {RepositoriosEspecieSetorListStoreModule} from './store/store.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: RepositoriosEspecieSetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/repositorios/repositorios-especie-setor/repositorios-especie-setor-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositoriosEspecieSetorListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        CdkSharedModule,

        RepositoriosEspecieSetorListStoreModule,
        CdkVinculacaoRepositorioGridModule,
        PathModule
    ],
    providers: [
        VinculacaoRepositorioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepositoriosEspecieSetorListComponent
    ]
})
export class RepositoriosEspecieSetorListModule {
}
