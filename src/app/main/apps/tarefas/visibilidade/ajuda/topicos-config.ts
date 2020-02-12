import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Controle de Acesso';
topico.descricao = 'Configurando o controle de acesso';
topico.module = () => import('app/main/apps/tarefas/visibilidade/ajuda/ajuda-visibilidade.module').then(m => {
    return {module: m.AjudaVisibilidadeModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
