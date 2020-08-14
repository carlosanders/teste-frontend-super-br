import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Sigilos';
topico.descricao = 'Sigilos de processos';
topico.module = () => import('app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module').then(m => m.AjudaSigilosModule);

export const topicosConfig =
    [
        topico
    ];
