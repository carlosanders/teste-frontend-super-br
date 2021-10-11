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
import {UsuarioService} from '@cdk/services/usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {UsuariosComponent} from './usuarios.component';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./usuarios-list/usuarios-list.module').then(m => m.UsuariosListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./usuario-edit/usuario-edit.module').then(m => m.UsuarioEditModule),
            },
            {
                path       : ':usuarioHandle/lotacoes',
                loadChildren: () => import('../lotacoes/coordenador-lotacoes.module').then(m => m.CoordenadorLotacoesModule),
            },
            {
                path       : ':usuarioHandle/afastamentos',
                loadChildren: () => import('../afastamentos/coordenador-afastamentos.module').then(m => m.CoordenadorAfastamentosModule),
            },
            {
                path: ':usuarioHandle/coordenadores',
                loadChildren: () => import('./coordenadores/coordenadores.module').then(m => m.CoordenadoresModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/coordenador/usuarios';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        UsuariosComponent
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
        UsuarioService
    ],
    exports: [
        UsuariosComponent
    ]
})
export class UsuariosModule {
}
