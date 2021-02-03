import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Relatórios';
topico.descricao = 'Extraindo relatorios';
topico.module = () => import('app/main/apps/relatorios/ajuda/ajuda-relatorios.module').then(m => m.AjudaRelatoriosModule);

export const topicosConfig =
    [
        topico
    ];
