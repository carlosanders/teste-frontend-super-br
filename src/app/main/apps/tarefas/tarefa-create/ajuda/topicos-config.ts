import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criação de tarefas';
topico.descricao = 'Descrição detalhada da criação de tarefas';
topico.module = () => import('app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module').then(m => {
    return {module: m.AjudaTarefaCreateModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
