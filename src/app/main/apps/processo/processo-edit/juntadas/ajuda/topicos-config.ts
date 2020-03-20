import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Juntadas';
topico.descricao = 'Documentos juntados';
topico.module = () => import('app/main/apps/processo/processo-edit/juntadas/ajuda/ajuda-juntadas.module').then(m => {
    return {module: m.AjudaJuntadasModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
