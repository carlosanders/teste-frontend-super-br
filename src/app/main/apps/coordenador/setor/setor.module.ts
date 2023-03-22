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
import {SetorComponent} from './setor.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {CdkSidebarModule} from '@cdk/components';
import * as fromGuards from './store/guards';
import {SetorMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CoordenadorSetorStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
    {
        path: ':setorHandle',
        component: SetorComponent,
        canActivate: [fromGuards.ResolveGuard],
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
                path       : 'etiquetas',
                loadChildren: () => import('../etiquetas/etiquetas.module').then(m => m.EtiquetasModule)
            },
            {
                path       : 'modelos',
                loadChildren: () => import('../modelos/modelos.module').then(m => m.ModelosModule)
            },
            {
                path       : 'repositorios',
                loadChildren: () => import('../repositorios/repositorios.module').then(m => m.RepositoriosModule)
            },
            {
                path       : 'usuarios',
                loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule)
            },
            {
                path       : 'lotacoes',
                loadChildren: () => import('../lotacoes/coordenador-lotacoes.module').then(m => m.CoordenadorLotacoesModule),
            },
            {
                path       : 'localizadores',
                loadChildren: () => import('../localizador/localizador.module').then(m => m.LocalizadorModule),
            },
            {
                path: 'coordenadores',
                loadChildren: () => import('./coordenadores/coordenadores.module').then(m => m.CoordenadoresModule),
            },
            {
                path       : 'numeros-unicos-documentos',
                loadChildren: () => import('../numero-unico-documento/numero-unico-documento.module').then(m => m.NumeroUnicoDocumentoModule),
            },
            {
                path       : 'avisos',
                loadChildren: () => import('../avisos/aviso.module').then(m => m.AvisoModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'default'
    }
];

const path = 'app/main/apps/coordenador/setor';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        SetorComponent,
        SetorMainSidebarComponent
    ],
    imports: [
        CommonModule,
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

        CdkSidebarModule,
        CoordenadorSetorStoreModule,
        MatRippleModule,
    ],
    providers: [
        SetorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        SetorComponent
    ]
})
export class SetorModule {
}
