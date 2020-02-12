import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criar compartilhamento de tarefas';
topico.descricao = 'Como criar um compartilhamento de tarefas no SUPP';
topico.module = () => import('app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/ajuda/ajuda-compartilhamento-create.module').then(m => {
    return {module: m.AjudaCompartilhamentoCreateModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
