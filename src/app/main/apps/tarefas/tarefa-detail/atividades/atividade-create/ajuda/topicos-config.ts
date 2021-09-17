import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Lançando uma atividade';
topico.descricao = 'Como lançar uma atividade';
topico.module = () => import('app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/ajuda/ajuda-atividade-create.module').then(m => m.AjudaAtividadeCreateModule);

export const topicosConfig =
    [
        topico
    ];
