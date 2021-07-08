import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Vídeos Complementares do Módulo Arquivista';
topico.descricao = 'Vídeos Complementares';
topico.module = () => import('app/main/apps/arquivista/ajuda-videos-arquivista/ajuda-videos-arquivista.module').then(m => m.AjudaVideosArquivistaModule);

export const topicosConfig =
    [
        topico
    ];