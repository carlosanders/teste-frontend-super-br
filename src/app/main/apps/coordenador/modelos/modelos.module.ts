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
import {ModelosComponent} from './modelos.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {RouterModule, Routes} from '@angular/router';

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
                path       : 'anexos',
                loadChildren: () => import('./modelos-anexo/modelos-anexo.module').then(m => m.ModelosAnexoModule),
            },
            {
                path       : ':modeloHandle/especie-setor',
                loadChildren: () => import('../especie-setor/especie-setor.module').then(m => m.EspecieSetorModule),
            },
            {
                path       : ':setorHandle/lotacoes',
                loadChildren: () => import('app/main/apps/admin/lotacoes/admin-lotacoes.module').then(m => m.AdminLotacoesModule),
            },
            {
                path       : ':setorHandle/localizadores',
                loadChildren: () => import('app/main/apps/admin/localizador/localizador.module').then(m => m.LocalizadorModule),
            },
            {
                path       : ':setorHandle/numeros-unicos-documentos',
                loadChildren: () => import('app/main/apps/admin/numero-unico-documento/numero-unico-documento.module').then(m => m.NumeroUnicoDocumentoModule),
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
