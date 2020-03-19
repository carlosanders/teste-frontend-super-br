import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criação de minutas em bloco de tarefas';
topico.descricao = 'Como criar minutas em um bloco de tarefas';
topico.module = () => import('app/main/apps/tarefas/modelo-bloco/ajuda/ajuda-modelo-bloco.module').then(m => {
    return {module: m.AjudaModeloBlocoModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
