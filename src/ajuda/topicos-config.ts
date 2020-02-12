import {modulesConfig} from '../modules/modules-config';

import {topicosConfig as tarefaAtividadeCreateBlocoTopicosConfig} from '../app/main/apps/tarefas/atividade-create-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaCompartilhamentoCreateBlocoTopicosConfig} from '../app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-create/ajuda/topicos-config';
import {topicosConfig as tarefaEditBlocoTopicosConfig} from '../app/main/apps/tarefas/tarefa-edit-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaUploadBlocoTopicosConfig} from '../app/main/apps/tarefas/upload-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaEtiquetaCreateBloco} from '../app/main/apps/tarefas/vinculacao-etiqueta-create-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaVisibilidadeTopicosConfig} from '../app/main/apps/tarefas/visibilidade/ajuda/topicos-config';
import {topicosConfig as tarefaAtividadeCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/ajuda/topicos-config';
import {topicosConfig as tarefaCompartilhamentoCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/ajuda/topicos-config';
import {topicosConfig as tarefaOficioCreateBlocoTopicosConfig} from '../app/main/apps/tarefas/documento-avulso-create-bloco/ajuda/topicos-config';




export let topicosConfig = [
    ...tarefaCreateTopicosConfig,
    ...tarefaCompartilhamentoCreateTopicosConfig,
    ...tarefaAtividadeCreateBlocoTopicosConfig,
    ...tarefaCompartilhamentoCreateBlocoTopicosConfig,
    ...tarefaEditBlocoTopicosConfig,
    ...tarefaUploadBlocoTopicosConfig,
    ...tarefaEtiquetaCreateBloco,
    ...tarefaVisibilidadeTopicosConfig,
    ...tarefaAtividadeCreateTopicosConfig,
    ...tarefaOficioCreateBlocoTopicosConfig,
];

modulesConfig.forEach((modulo) => {
    modulo.ajuda.forEach((topico) => {
        topicosConfig = [
            ...topicosConfig,
            topico
        ];
    });
});
