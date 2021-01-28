import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Painel';
topico.descricao = 'Novos painéis, históricos';
topico.module = () => import('app/main/apps/painel/ajuda/ajuda-painel.module').then(m => m.AjudaPainelModule);

export const topicosConfig =
    [
        topico
    ];
