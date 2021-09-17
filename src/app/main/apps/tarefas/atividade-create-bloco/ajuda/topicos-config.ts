import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Lançando atividades em bloco';
topico.descricao = 'Como lançar atividades em bloco';
topico.module = () => import('app/main/apps/tarefas/atividade-create-bloco/ajuda/ajuda-atividade-create-bloco.module').then(m => m.AjudaAtividadeCreateBlocoModule);

export const topicosConfig =
    [
        topico
    ];
