import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Juntadas';
topico.descricao = 'Documentos Juntados';
topico.module = () => import('app/main/apps/processo/processo-edit/juntadas/ajuda/ajuda-juntadas.module').then(m => m.AjudaJuntadasModule);

export const topicosConfig =
    [
        topico
    ];
