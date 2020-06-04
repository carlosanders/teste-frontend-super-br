import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criar tarefas';
topico.descricao = 'Como criar uma tarefa';
topico.module = () => import('app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module').then(m => {
    return {module: m.AjudaTarefaCreateModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
