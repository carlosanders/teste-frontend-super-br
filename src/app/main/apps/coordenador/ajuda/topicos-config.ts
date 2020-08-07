import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Coordenador';
topico.descricao = 'Módulo do Coordenador';
topico.module = () => import('app/main/apps/coordenador/ajuda/ajuda-coordenador.module').then(m => m.AjudaCoordenadorModule);

export const topicosConfig =
    [
        topico
    ];
