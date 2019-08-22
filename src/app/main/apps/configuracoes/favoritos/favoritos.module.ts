import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { FavoritoEditMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { FavoritosComponent } from './favoritos.component';
import { CommonModule } from '@angular/common';
import * as fromGuards from './store/guards';


const routes: Routes = [
    {
        path: '',
        component: FavoritosComponent,
        children: [
            {
                path       : 'favorito-especie-atividade',
                loadChildren: './favorito-especie-atividade-list/favorito-especie-atividade-list.module#FavoritoEspecieAtividadeListModule'
            },
            {
                path       : 'favorito-especie-tarefa',
                loadChildren: './favorito-especie-tarefa-list/favorito-especie-tarefa-list.module#FavoritoEspecieTarefaListModule'
            },
            {
                path       : 'favorito-setor-responsavel',
                loadChildren: './favorito-setor-responsavel-list/favorito-setor-responsavel-list.module#FavoritoSetorResponsavelListModule'
            },
            {
                path       : '**',
                redirectTo: 'favorito-especie-atividade'
            }
        ]
    }
];

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

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
        fromGuards.ResolveGuard
    ]
})
export class FavoritosModule
{
}
