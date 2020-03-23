import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criando ofícios';
topico.descricao = 'Como criar oficios';
topico.module = () => import('app/main/apps/oficios/ajuda/ajuda-oficios.module').then(m => {
    return {module: m.AjudaOficiosModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
