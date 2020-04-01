import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Lançando uma atividade';
topico.descricao = 'Como lançar uma atividade no SUPP';
topico.module = () => import('app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/ajuda/ajuda-atividade-create.module').then(m => {
    return {module: m.AjudaAtividadeCreateModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
