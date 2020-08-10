import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Pesquisa';
topico.descricao = 'Pesquisando no sistema';
topico.module = () => import('app/main/apps/pesquisa/ajuda/ajuda-pesquisa.module').then(m => m.AjudaPesquisaModule);

export const topicosConfig =
    [
        topico
    ];
