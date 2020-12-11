import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criar tarefas';
topico.descricao = 'Como criar uma tarefa no sistema';
topico.module = () => import('app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module').then(m => m.AjudaTarefaCreateModule);

export const topicosConfig =
    [
        topico
    ];
