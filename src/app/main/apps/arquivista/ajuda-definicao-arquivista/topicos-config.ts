import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Definições Arquivísiticas';
topico.descricao = 'Definições e Conceitos do Módulo Arquivista';
topico.module = () => import('app/main/apps/arquivista/ajuda-definicao-arquivista/ajuda-definicao-arquivista.module').then(m => m.AjudaDefinicaoArquivistaModule);

export const topicosConfig =
    [
        topico
    ];
