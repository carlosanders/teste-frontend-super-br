import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Pesquisa';
topico.descricao = 'Pesquisando no sistema';
topico.module = () => import('app/main/apps/pesquisa/ajuda/ajuda-pesquisa.module').then(m => {
    return {module: m.AjudaPesquisaModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
