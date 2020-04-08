import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RepositoriosEspecieSetorComponent} from './repositorios-especie-setor.component';
import {RepositoriosEspecieSetorStoreModule} from './store/store.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';

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
