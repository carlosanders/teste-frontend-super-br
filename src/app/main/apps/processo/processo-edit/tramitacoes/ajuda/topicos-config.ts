import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Tramitações';
topico.descricao = 'Tramitações de documentos';
topico.module = () => import('app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-tramitacoes.module').then(m => m.AjudaTramitacoesModule);

export const topicosConfig =
    [
        topico
    ];
