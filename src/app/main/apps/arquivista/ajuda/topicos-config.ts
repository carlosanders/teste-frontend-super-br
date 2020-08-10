import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Arquivando Processos';
topico.descricao = 'Modulo Arquivista';
topico.module = () => import('app/main/apps/arquivista/ajuda/ajuda-arquivista.module').then(m => m.AjudaArquivistaModule);

export const topicosConfig =
    [
        topico
    ];
