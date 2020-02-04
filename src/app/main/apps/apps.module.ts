import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [ 
    {
        path        : 'painel',
        loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule)
    },
    {
        path        : 'tarefas',
        loadChildren: () => import('./tarefas/tarefas.module').then(m => m.TarefasModule)
    },
    {
        path        : 'processo',
        loadChildren: () => import('./processo/processo.module').then(m => m.ProcessoModule)
    },
/*    {
        path        : 'aproveitar-dados',
        loadChildren: () => import('./processo/processo-edit/aproveitar-dados/aproveitar-dados.module').then(m => m.AproveitarDadosModule)
    },*/
    {
        path        : 'documento',
        loadChildren: () => import('./documento/documento.module').then(m => m.DocumentoModule)
    },
    {
        path        : 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule)
    },
    {
        path        : 'pesquisa',
        loadChildren: () => import('./pesquisa/pesquisa.module').then(m => m.PesquisaModule)
    },
    {
        path        : 'configuracoes',
        loadChildren: () => import('./configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
