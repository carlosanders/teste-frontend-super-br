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

import {CdkSharedModule} from '@cdk/shared.module';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UnidadesComponent} from './unidades.component';

const routes: Routes = [
    {
        path: '',
        component: UnidadesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./unidades-list/unidades-list.module').then(m => m.UnidadesListModule)
            },
            {
                path       : 'editar',
                loadChildren: () => import('./unidade-edit/unidade-edit.module').then(m => m.UnidadeEditModule),
            },
            {
                path       : ':unidadeHandle/competencias',
                loadChildren: () => import('./competencias/competencias.module').then(m => m.CompetenciasModule),
            },
            {
                path       : ':unidadeHandle/setores',
                loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule),
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
