import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ConfiguracoesComponent } from './configuracoes.component';
import { ConfiguracoesMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path       : '',
        component: ConfiguracoesComponent,
        children: [
            {
                path       : 'perfil',
                loadChildren: './perfil/perfil.module#PerfilModule'
            },
            {
                path       : 'seguranca',
                loadChildren: './seguranca/seguranca.module#SegurancaModule'
            },
            {
                path       : 'afastamentos',
                loadChildren: './afastamentos/afastamentos.module#AfastamentosModule'
            },
            {
                path       : 'lotacoes',
                loadChildren: './lotacoes/lotacoes.module#LotacoesModule'
            },
            {
                path       : 'notificacoes',
                loadChildren: './notificacoes/notificacoes.module#NotificacoesModule'
            },
            {
                path       : 'analistas',
                loadChildren: './vinculacoes-usuarios/vinculacoes-usuarios.module#VinculacoesUsuariosModule'
            },
            {
                path       : 'modelos',
                loadChildren: './modelos/modelos.module#ModelosModule'
            },
            {
                path       : 'repositorios',
                loadChildren: './repositorios/repositorios.module#RepositoriosModule'
            },
            {
                path       : 'etiquetas',
                loadChildren: './etiquetas/etiquetas.module#EtiquetasModule'
            },
            {
                path       : 'pastas',
                loadChildren: './folders/folders.module#FoldersModule'
            },
            {
                path       : 'favoritos',
                loadChildren: './favoritos/favoritos.module#FavoritosModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'perfil'
    }
];

@NgModule({
    declarations   : [
        ConfiguracoesComponent,
        ConfiguracoesMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
    ]
})
export class ConfiguracoesModule
{
}
