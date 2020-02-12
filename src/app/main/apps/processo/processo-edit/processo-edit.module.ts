import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatRippleModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ProcessoEditMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {ProcessoEditComponent} from './processo-edit.component';
import {CommonModule} from '@angular/common';

import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ProcessoEditComponent,
        children: [
            {
                path: 'processo-empty',
                loadChildren: () => import('./processo-empty/processo-empty.module').then(m => m.ProcessoEmptyModule),
            },
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/dados-basicos.module').then(m => m.DadosBasicosModule)
            },
            {
                path: 'assuntos',
                loadChildren: () => import('./assuntos/assuntos.module').then(m => m.AssuntosModule)
            },
            {
                path: 'interessados',
                loadChildren: () => import('./interessados/interessados.module').then(m => m.InteressadosModule)
            },
            {
                path: 'juntadas',
                loadChildren: () => import('./juntadas/juntadas.module').then(m => m.JuntadasModule)
            },
            {
                path: 'acessos',
                loadChildren: () => import('./visibilidades/visibilidades.module').then(m => m.VisibilidadesModule)
            },
            {
                path: 'vinculacoes-processos',
                loadChildren: () => import('./vinculacoes-processos/vinculacoes-processos.module').then(m => m.VinculacoesProcessosModule)
            },
            {
                path: 'sigilos',
                loadChildren: () => import('./sigilos/sigilos.module').then(m => m.SigilosModule)
            },
            {
                path: 'tarefas',
                loadChildren: () => import('./tarefas/processo-tarefas.module').then(m => m.ProcessoTarefasModule)
            },
            {
                path: 'oficios',
                loadChildren: () => import('./documentos-avulsos/processo-documentos-avulsos.module').then(m => m.ProcessoDocumentosAvulsosModule)
            },
            {
                path: 'remessas',
                loadChildren: () => import('./tramitacoes/tramitacoes.module').then(m => m.TramitacoesModule)
            },
            {
                path: 'remessas',
                loadChildren: () => import('./remessas/remessas.module').then(m => m.RemessasModule)
            },
            {
                path: 'transicoes',
                loadChildren: () => import('./transicoes/transicoes.module').then(m => m.TransicoesModule)
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

routes[0].children.push({
    path: '**',
    redirectTo: 'dados-basicos'
});

@NgModule({
    declarations: [
        ProcessoEditComponent,
        ProcessoEditMainSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatRippleModule,
        MatIconModule,
        MatButtonModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatTooltipModule
    ]
})
export class ProcessoEditModule {
}
