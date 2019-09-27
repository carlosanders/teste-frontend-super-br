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
                loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
            },
            {
                path       : 'seguranca',
                loadChildren: () => import('./seguranca/seguranca.module').then(m => m.SegurancaModule)
            },
            {
                path       : 'afastamentos',
                loadChildren: () => import('./afastamentos/afastamentos.module').then(m => m.AfastamentosModule)
            },
            {
                path       : 'lotacoes',
                loadChildren: () => import('./lotacoes/lotacoes.module').then(m => m.LotacoesModule)
            },
            {
                path       : 'notificacoes',
                loadChildren: () => import('./notificacoes/notificacoes.module').then(m => m.NotificacoesModule)
            },
            {
                path       : 'analistas',
                loadChildren: () => import('./vinculacoes-usuarios/vinculacoes-usuarios.module').then(m => m.VinculacoesUsuariosModule)
            },
            {
                path       : 'modelos',
                loadChildren: () => import('./modelos/modelos.module').then(m => m.ModelosModule)
            },
            {
                path       : 'repositorios',
                loadChildren: () => import('./repositorios/repositorios.module').then(m => m.RepositoriosModule)
            },
            {
                path       : 'etiquetas',
                loadChildren: () => import('./etiquetas/etiquetas.module').then(m => m.EtiquetasModule)
            },
            {
                path       : 'pastas',
                loadChildren: () => import('./folders/folders.module').then(m => m.FoldersModule)
            },
            {
                path       : 'favoritos',
                loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosModule)
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
