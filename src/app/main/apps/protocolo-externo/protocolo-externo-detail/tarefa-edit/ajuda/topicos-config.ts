import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Editar tarefas';
topico.descricao = 'Como editar uma tarefa no SUPP';
topico.module = () => import('app/main/apps/tarefas/tarefa-detail/tarefa-edit/ajuda/ajuda-tarefa-edit.module').then(m => {
    return {module: m.AjudaTarefaEditModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
