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

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./usuarios-list/usuarios-list.module').then(m => m.UsuariosListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./usuario-edit/usuario-edit.module').then(m => m.UsuarioEditModule),
            },
            {
                path: ':usuarioHandle/lotacoes',
                loadChildren: () => import('../lotacoes/admin-lotacoes.module').then(m => m.AdminLotacoesModule),
            },
            {
                path: ':usuarioHandle/afastamentos',
                loadChildren: () => import('./afastamentos/admin-afastamentos.module').then(m => m.AdminAfastamentosModule),
            },
            {
                path: ':usuarioHandle/coordenadores',
                loadChildren: () => import('./coordenadores/admin-coordenadores.module').then(m => m.AdminCoordenadoresModule),
            },
            {
                path: ':usuarioHandle/roles',
                loadChildren: () => import('./roles/admin-roles.module').then(m => m.AdminRolesModule),
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
