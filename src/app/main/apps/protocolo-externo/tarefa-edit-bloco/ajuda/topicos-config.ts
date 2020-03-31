import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Editando tarefas em bloco';
topico.descricao = 'Como editar tarefas em bloco';
topico.module = () => import('app/main/apps/tarefas/tarefa-edit-bloco/ajuda/ajuda-tarefa-edit-bloco.module').then(m => {
    return {module: m.AjudaTarefaEditBlocoModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
