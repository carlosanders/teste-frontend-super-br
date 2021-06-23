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
import {ModelosEspecieSetorListComponent} from './modelos-especie-setor-list.component';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkVinculacaoModeloGridModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-grid/cdk-vinculacao-modelo-grid.module';
import {ModelosEspecieSetorListStoreModule} from './store/store.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: ModelosEspecieSetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/modelos/modelos-especie-setor/modelos-especie-setor-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModelosEspecieSetorListComponent
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

        ModelosEspecieSetorListStoreModule,
        CdkVinculacaoModeloGridModule,
        PathModule
    ],
    providers: [
        VinculacaoModeloService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ModelosEspecieSetorListComponent
    ]
})
export class ModelosEspecieSetorListModule {
}
