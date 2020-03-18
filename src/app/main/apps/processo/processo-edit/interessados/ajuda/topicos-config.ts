import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Interessados';
topico.descricao = 'Cadastrando um interessado';
topico.module = () => import('app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module').then(m => {
    return {module: m.AjudaInteressadosModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
