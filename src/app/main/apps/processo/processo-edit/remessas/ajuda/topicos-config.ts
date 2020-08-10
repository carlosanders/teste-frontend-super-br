import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Remessas';
topico.descricao = 'Remessas';
topico.module = () => import('app/main/apps/processo/processo-edit/remessas/ajuda/ajuda-remessas.module').then(m => m.AjudaRemessasModule);

export const topicosConfig =
    [
        topico
    ];
