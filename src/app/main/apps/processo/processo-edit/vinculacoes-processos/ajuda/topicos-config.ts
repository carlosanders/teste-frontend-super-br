import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Vinculações';
topico.descricao = 'Vinculações de documentos';
topico.module = () => import('app/main/apps/processo/processo-edit/vinculacoes-processos/ajuda/ajuda-vinculacoes-processos.module').then(m => m.AjudaVinculacoesProcessosModule);

export const topicosConfig =
    [
        topico
    ];
