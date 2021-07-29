import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Arquivo: Utilizando o Módulo Arquivista';
topico.descricao = 'Passo a passo para utilizar o módulo de arquivistas';
topico.module = () => import('app/main/apps/arquivista/ajuda-arquivista/ajuda-arquivista.module').then(m => m.AjudaArquivistaModule);

export const topicosConfig =
    [
        topico
    ];
