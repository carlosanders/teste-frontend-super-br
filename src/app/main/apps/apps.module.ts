import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'painel',
        loadChildren: './painel/painel.module#PainelModule'
    },
    {
        path        : 'tarefas',
        loadChildren: './tarefas/tarefas.module#TarefasModule'
    },
    {
        path        : 'processo',
        loadChildren: './processo/processo.module#ProcessoModule'
    },
    {
        path        : 'documento',
        loadChildren: './documento/documento.module#DocumentoModule'
    },
    {
        path        : 'pessoa',
        loadChildren: './pessoa/pessoa.module#PessoaModule'
    },
    {
        path        : 'pesquisa',
        loadChildren: './pesquisa/pesquisa.module#PesquisaModule'
    },
    {
        path        : 'configuracoes',
        loadChildren: './configuracoes/configuracoes.module#ConfiguracoesModule'
    },
    {
        path        : 'teste',
        loadChildren: './teste/teste.module#TesteModule'
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
