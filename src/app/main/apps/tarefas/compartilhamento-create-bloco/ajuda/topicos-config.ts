import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Compartilhando minutas em bloco';
topico.descricao = 'Como compartilhar minutas em bloco';
topico.module = () => import('app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/ajuda-compartilhamento-create-bloco.module').then(m => {
    return {module: m.AjudaCompartilhamentoCreateBlocoModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
