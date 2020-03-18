import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Lançando atividades em bloco';
topico.descricao = 'Como lançar atividades em bloco no SUPP';
topico.module = () => import('app/main/apps/tarefas/atividade-create-bloco/ajuda/ajuda-atividade-create-bloco.module').then(m => {
    debugger;
    return {module: m.AjudaAtividadeCreateBlocoModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
