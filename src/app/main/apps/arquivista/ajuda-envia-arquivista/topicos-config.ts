import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Arquivo: Enviando processos para o Arquivo';
topico.descricao = 'Passo a passo para envio de processos para o Arquivista';
topico.module = () => import('app/main/apps/arquivista/ajuda-envia-arquivista/ajuda-envia-arquivista.module').then(m => m.AjudaEnviaArquivistaModule);

export const topicosConfig =
    [
        topico
    ];
