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
import {SetorComponent} from './setor.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SetorComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./setor-list/setor-list.module').then(m => m.SetorListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./setor-edit/setor-edit.module').then(m => m.SetorEditModule),
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
        SetorComponent
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
        SetorService
    ],
    exports: [
        SetorComponent
    ]
})
export class SetorModule {
}
