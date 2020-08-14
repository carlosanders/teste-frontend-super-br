import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Transições';
topico.descricao = 'Transições de documentos';
topico.module = () => import('app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module').then(m => m.AjudaTransicoesModule);

export const topicosConfig =
    [
        topico
    ];
