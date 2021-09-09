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
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UnidadesComponent} from './unidades.component';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: UnidadesComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./unidades-list/unidades-list.module').then(m => m.UnidadesListModule)
            },
            {
                path: 'editar',
                loadChildren: () => import('./unidade-edit/unidade-edit.module').then(m => m.UnidadeEditModule),
            },
            {
                path: ':unidadeHandle/competencias',
                loadChildren: () => import('./competencias/competencias.module').then(m => m.CompetenciasModule),
            },
            {
                path: ':unidadeHandle/setores',
                loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/admin/unidades';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        UnidadesComponent
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
        MatTooltipModule,
    ],
    providers: [
        SetorService
    ],
    exports: [
        UnidadesComponent
    ]
})
export class UnidadesModule {
}
