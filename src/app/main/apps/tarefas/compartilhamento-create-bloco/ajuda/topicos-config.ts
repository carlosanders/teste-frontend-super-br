import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Compartilhando tarefas em bloco';
topico.descricao = 'Como compartilhar tarefas em bloco no SUPP';
topico.module = () => import('app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/ajuda-compartilhamento-create-bloco.module').then(m => {
    return {module: m.AjudaCompartilhamentoCreateBlocoModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
