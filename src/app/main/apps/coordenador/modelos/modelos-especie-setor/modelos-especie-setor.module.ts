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
import {ModeloService} from '@cdk/services/modelo.service';
import {ModelosEspecieSetorComponent} from './modelos-especie-setor.component';
import {ModelosEspecieSetorStoreModule} from './store/store.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';

const routes: Routes = [
    {
        path: '',
        component: ModelosEspecieSetorComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./modelos-especie-setor-list/modelos-especie-setor-list.module').then(m => m.ModelosEspecieSetorListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./modelos-especie-setor-edit/modelos-especie-setor-edit.module').then(m => m.ModelosEspecieSetorEditModule),
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
        ModelosEspecieSetorComponent
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

        ModelosEspecieSetorStoreModule,

        CdkSharedModule
    ],
    providers: [
        ModeloService,
        VinculacaoModeloService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ModelosEspecieSetorComponent
    ]
})
export class ModelosEspecieSetorModule {
}
