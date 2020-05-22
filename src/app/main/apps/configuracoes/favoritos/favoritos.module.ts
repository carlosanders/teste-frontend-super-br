import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import { FavoritoEditMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { FavoritosComponent } from './favoritos.component';
import { CommonModule } from '@angular/common';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: FavoritosComponent,
        children: [
            {
                path       : 'favorito-especie-atividade',
                loadChildren: () => import('./favorito-especie-atividade-list/favorito-especie-atividade-list.module').then(m => m.FavoritoEspecieAtividadeListModule)
            },
            {
                path       : 'favorito-especie-tarefa',
                loadChildren: () => import('./favorito-especie-tarefa-list/favorito-especie-tarefa-list.module').then(m => m.FavoritoEspecieTarefaListModule)
            },
            {
                path       : 'favorito-setor-responsavel',
                loadChildren: () => import('./favorito-setor-responsavel-list/favorito-setor-responsavel-list.module').then(m => m.FavoritoSetorResponsavelListModule)
            },
            {
                path       : '**',
                redirectTo: 'favorito-especie-atividade'
            }
        ]
    }
];

const path = 'app/main/apps/configuracoes/favoritos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations   : [
        FavoritosComponent,
        FavoritoEditMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers      : [
        fromGuards.ResolveGuard
    ]
})
export class FavoritosModule
{
}
