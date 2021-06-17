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
import {ModelosComponent} from './modelos.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ModelosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./modelos-list/modelos-list.module').then(m => m.ModelosListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./modelos-edit/modelos-edit.module').then(m => m.ModelosEditModule),
            },
            {
                path       : ':modeloHandle/especie-setor',
                loadChildren: () => import('./modelos-especie-setor/modelos-especie-setor.module').then(m => m.ModelosEspecieSetorModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'listar'
    }
];

const path = 'app/main/apps/coordenador/modelos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModelosComponent
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
    ],
    providers: [
        ModeloService
    ],
    exports: [
        ModelosComponent
    ]
})
export class ModelosModule {
}
