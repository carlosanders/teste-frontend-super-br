import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ProcessoEditMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { ProcessoEditComponent } from './processo-edit.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path       : '',
        component: ProcessoEditComponent,
        children: [
            {
                path       : 'dados-basicos',
                loadChildren: './dados-basicos/dados-basicos.module#DadosBasicosModule'
            },
            {
                path       : 'assuntos',
                loadChildren: './assuntos/assuntos.module#AssuntosModule'
            },
            {
                path       : 'interessados',
                loadChildren: './interessados/interessados.module#InteressadosModule'
            },
            {
                path       : 'juntadas',
                loadChildren: './juntadas/juntadas.module#JuntadasModule'
            },
            {
                path       : 'vinculacoes-processos',
                loadChildren: './vinculacoes-processos/vinculacoes-processos.module#VinculacoesProcessosModule'
            },
            {
                path       : 'sigilos',
                loadChildren: './sigilos/sigilos.module#SigilosModule'
            },
            {
                path       : 'tarefas',
                loadChildren: './tarefas/processo-tarefas.module#ProcessoTarefasModule'
            },
            {
                path       : 'oficios',
                loadChildren: './documentos-avulsos/processo-documentos-avulsos.module#ProcessoDocumentosAvulsosModule'
            },
            {
                path       : 'tramitacoes',
                loadChildren: './tramitacoes/tramitacoes.module#TramitacoesModule'
            },
            {
                path       : 'transicoes',
                loadChildren: './transicoes/transicoes.module#TransicoesModule'
            },
            {
                path       : '**',
                redirectTo: 'dados-basicos'
            }
        ]
    }
];

@NgModule({
    declarations   : [
        ProcessoEditComponent,
        ProcessoEditMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ]
})
export class ProcessoEditModule
{
}
