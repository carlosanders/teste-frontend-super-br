import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Editando tarefas em bloco';
topico.descricao = 'Como editar tarefas em bloco';
topico.module = () => import('app/main/apps/tarefas/tarefa-edit-bloco/ajuda/ajuda-tarefa-edit-bloco.module').then(m => m.AjudaTarefaEditBlocoModule);

export const topicosConfig =
    [
        topico
    ];
