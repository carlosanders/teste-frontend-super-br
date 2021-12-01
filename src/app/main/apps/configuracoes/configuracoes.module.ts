import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ConfiguracoesComponent} from './configuracoes.component';
import {ConfiguracoesMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from '@angular/material/core';
import {modulesConfig} from 'modules/modules-config';

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
                path       : 'assessores',
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
            },
            {
                path       : 'acompanhamentos',
                loadChildren: () => import('./acompanhamentos/acompanhamentos.module').then(m => m.AcompanhamentosModule)
            },
            {
                path       : 'grupo-contato',
                loadChildren: () => import('./grupo-contato/grupo-contato.module').then(m => m.GrupoContatoModule)
            },
            {
                path       : 'historico',
                loadChildren: () => import('./historico/historico.module').then(m => m.HistoricoModule)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'perfil'
    }
];

const path = 'app/main/apps/configuracoes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations   : [
        ConfiguracoesComponent,
        ConfiguracoesMainSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule
    ],
    providers      : [
    ]
})
export class ConfiguracoesModule
{
}
