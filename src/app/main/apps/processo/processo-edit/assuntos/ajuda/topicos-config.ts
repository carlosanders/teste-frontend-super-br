import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Assuntos';
topico.descricao = 'Cadastrando um assunto';
topico.module = () => import('app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module').then(m => m.AjudaAssuntosModule);

export const topicosConfig =
    [
        topico
    ];
