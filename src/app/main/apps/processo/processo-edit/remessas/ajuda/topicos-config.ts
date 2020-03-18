import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Remessas';
topico.descricao = 'Remessas';
topico.module = () => import('app/main/apps/processo/processo-edit/remessas/ajuda/ajuda-remessas.module').then(m => {
    return {module: m.AjudaRemessasModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
