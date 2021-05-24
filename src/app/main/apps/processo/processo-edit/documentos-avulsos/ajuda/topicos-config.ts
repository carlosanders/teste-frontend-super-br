import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Ofícios';
topico.descricao = 'Entendendo os oficios';
topico.module = () => import('app/main/apps/processo/processo-edit/documentos-avulsos/ajuda/ajuda-documentos-avulsos.module').then(m => ({module: m.AjudaDocumentosAvulsosModule, componentIndex: 0}));

export const topicosConfig =
    [
        topico
    ];
