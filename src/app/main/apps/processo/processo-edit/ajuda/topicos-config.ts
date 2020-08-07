import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criando processos';
topico.descricao = 'Como criar processos';
topico.module = () => import('app/main/apps/processo/processo-edit/ajuda/ajuda-processo-edit.module').then(m => m.AjudaProcessoEditModule);

export const topicosConfig =
    [
        topico
    ];
