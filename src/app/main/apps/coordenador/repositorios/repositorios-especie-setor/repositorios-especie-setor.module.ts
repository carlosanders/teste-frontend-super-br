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

import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RepositoriosEspecieSetorComponent} from './repositorios-especie-setor.component';
import {RepositoriosEspecieSetorStoreModule} from './store/store.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RepositoriosEspecieSetorComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./repositorios-especie-setor-list/repositorios-especie-setor-list.module').then(m => m.RepositoriosEspecieSetorListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./repositorios-especie-setor-edit/repositorios-especie-setor-edit.module').then(m => m.RepositoriosEspecieSetorEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/coordenador/repositorios/repositorios-especie-setor';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositoriosEspecieSetorComponent
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

        RepositoriosEspecieSetorStoreModule,

        CdkSharedModule
    ],
    providers: [
        RepositorioService,
        VinculacaoRepositorioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepositoriosEspecieSetorComponent
    ]
})
export class RepositoriosEspecieSetorModule {
}
