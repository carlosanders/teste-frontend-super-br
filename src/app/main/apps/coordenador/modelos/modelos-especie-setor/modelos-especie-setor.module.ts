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
import {ModeloService} from '@cdk/services/modelo.service';
import {ModelosEspecieSetorComponent} from './modelos-especie-setor.component';
import {ModelosEspecieSetorStoreModule} from './store/store.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from "@angular/material/tooltip";

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

const path = 'app/main/apps/coordenador/modelos/modelos-especie-setor';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkSharedModule,
        MatTooltipModule
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
