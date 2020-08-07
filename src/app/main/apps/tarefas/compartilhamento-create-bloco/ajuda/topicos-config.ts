import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Compartilhando minutas em bloco';
topico.descricao = 'Como compartilhar minutas em bloco';
topico.module = () => import('app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/ajuda-compartilhamento-create-bloco.module').then(m => m.AjudaCompartilhamentoCreateBlocoModule);

export const topicosConfig =
    [
        topico
    ];
