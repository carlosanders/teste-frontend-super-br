import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Sigilos';
topico.descricao = 'Sigilos de processos';
topico.module = () => import('app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module').then(m => {
    return {module: m.AjudaSigilosModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
