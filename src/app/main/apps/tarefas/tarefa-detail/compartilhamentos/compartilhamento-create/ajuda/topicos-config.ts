import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Compartilhando minutas';
topico.descricao = 'Como compartilhar minutas';
topico.module = () => import('app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/ajuda/ajuda-compartilhamento-create.module').then(m => m.AjudaCompartilhamentoCreateModule);

export const topicosConfig =
    [
        topico
    ];
