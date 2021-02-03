import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criando volumes';
topico.descricao = 'Criação de volumes de processos';
topico.module = () => import('app/main/apps/processo/processo-edit/volumes/ajuda/ajuda-volumes.module').then(m => m.AjudaVolumesModule);

export const topicosConfig =
    [
        topico
    ];
