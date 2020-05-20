import {modulesConfig} from '../modules/modules-config';

import {topicosConfig as tarefaAtividadeCreateBlocoTopicosConfig} from '../app/main/apps/tarefas/atividade-create-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaCompartilhamentoCreateBlocoTopicosConfig} from '../app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-create/ajuda/topicos-config';
import {topicosConfig as tarefaEditBlocoTopicosConfig} from '../app/main/apps/tarefas/tarefa-edit-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaUploadBlocoTopicosConfig} from '../app/main/apps/tarefas/upload-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaEtiquetaCreateBloco} from '../app/main/apps/tarefas/vinculacao-etiqueta-create-bloco/ajuda/topicos-config';
import {topicosConfig as tarefaAtividadeCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/ajuda/topicos-config';
import {topicosConfig as tarefaCompartilhamentoCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/ajuda/topicos-config';
import {topicosConfig as tarefaOficioCreateBlocoTopicosConfig} from '../app/main/apps/tarefas/documento-avulso-create-bloco/ajuda/topicos-config';
import {topicosConfig as processoEditTopicosConfig} from '../app/main/apps/processo/processo-edit/ajuda/topicos-config';
import {topicosConfig as assuntosTopicosConfig} from '../app/main/apps/processo/processo-edit/assuntos/ajuda/topicos-config';
import {topicosConfig as interessadosTopicosConfig} from '../app/main/apps/processo/processo-edit/interessados/ajuda/topicos-config';
import {topicosConfig as juntadasEditTopicosConfig} from '../app/main/apps/processo/processo-edit/juntadas/ajuda/topicos-config';
import {topicosConfig as vinculacoesProcessoTopicosConfig} from '../app/main/apps/processo/processo-edit/vinculacoes-processos/ajuda/topicos-config';
import {topicosConfig as oficiosTopicosConfig} from '../app/main/apps/oficios/ajuda/topicos-config';
import {topicosConfig as tramitacoesTopicosConfig} from '../app/main/apps/processo/processo-edit/tramitacoes/ajuda/topicos-config';
import {topicosConfig as remessasTopicosConfig} from '../app/main/apps/processo/processo-edit/remessas/ajuda/topicos-config';
import {topicosConfig as transicoesTopicosConfig} from '../app/main/apps/processo/processo-edit/transicoes/ajuda/topicos-config';
import {topicosConfig as sigilosTopicosConfig} from '../app/main/apps/processo/processo-edit/sigilos/ajuda/topicos-config';
import {topicosConfig as visibilidadesTopicosConfig} from '../app/main/apps/processo/processo-edit/visibilidades/ajuda/topicos-config';
import {topicosConfig as arquivistaTopicosConfig} from '../app/main/apps/arquivista/ajuda/topicos-config';







export let topicosConfig = [
    ...tarefaCreateTopicosConfig,
    ...tarefaCompartilhamentoCreateTopicosConfig,
    ...tarefaAtividadeCreateBlocoTopicosConfig,
    ...tarefaCompartilhamentoCreateBlocoTopicosConfig,
    ...tarefaEditBlocoTopicosConfig,
    ...tarefaUploadBlocoTopicosConfig,
    ...tarefaEtiquetaCreateBloco,
    ...tarefaAtividadeCreateTopicosConfig,
    ...tarefaOficioCreateBlocoTopicosConfig,
    ...processoEditTopicosConfig,
    ...assuntosTopicosConfig,
    ...interessadosTopicosConfig,
    ...juntadasEditTopicosConfig,
    ...vinculacoesProcessoTopicosConfig,
    ...oficiosTopicosConfig,
    ...tramitacoesTopicosConfig,
    ...remessasTopicosConfig,
    ...transicoesTopicosConfig,
    ...sigilosTopicosConfig,
    ...visibilidadesTopicosConfig,
    ...arquivistaTopicosConfig,
];

modulesConfig.forEach((modulo) => {
    modulo.ajuda.forEach((topico) => {
        topicosConfig = [
            ...topicosConfig,
            topico
        ];
    });
});
