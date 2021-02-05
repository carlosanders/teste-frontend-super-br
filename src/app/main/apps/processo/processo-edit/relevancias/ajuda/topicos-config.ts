import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Atribuindo relevâncias';
topico.descricao = 'Como atribuir relevancias a um processo';
topico.module = () => import('app/main/apps/processo/processo-edit/relevancias/ajuda/ajuda-relevancias.module').then(m => m.AjudaRelevanciasModule);

export const topicosConfig =
    [
        topico
    ];
