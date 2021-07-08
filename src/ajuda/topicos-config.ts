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
import {topicosConfig as arquivistaTopicosConfig} from '../app/main/apps/arquivista/ajuda-arquivista/topicos-config';
import {topicosConfig as arquivistaDefinicaoTopicosConfig} from '../app/main/apps/arquivista/ajuda-definicao-arquivista/topicos-config';
import {topicosConfig as arquivistaEnviaTopicosConfig} from '../app/main/apps/arquivista/ajuda-envia-arquivista/topicos-config';
import {topicosConfig as arquivistaVideosTopicosConfig} from '../app/main/apps/arquivista/ajuda-videos-arquivista/topicos-config';
import {topicosConfig as administradorTopicosConfig} from '../app/main/apps/admin/ajuda/topicos-config';
import {topicosConfig as coordenadorTopicosConfig} from '../app/main/apps/coordenador/ajuda/topicos-config';
import {topicosConfig as configuracoesTopicosConfig} from '../app/main/apps/configuracoes/ajuda/topicos-config';
import {topicosConfig as pesquisaTopicosConfig} from '../app/main/apps/pesquisa/ajuda/topicos-config';
import {topicosConfig as relatoriosTopicosConfig} from '../app/main/apps/relatorios/ajuda/topicos-config';
import {topicosConfig as relevanciasTopicosConfig} from '../app/main/apps/processo/processo-edit/relevancias/ajuda/topicos-config';
import {topicosConfig as volumesTopicosConfig} from '../app/main/apps/processo/processo-edit/volumes/ajuda/topicos-config';
import {topicosConfig as painelTopicosConfig} from '../app/main/apps/painel//ajuda/topicos-config';


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
    ...arquivistaDefinicaoTopicosConfig,
    ...arquivistaEnviaTopicosConfig,
    ...arquivistaVideosTopicosConfig,
    ...administradorTopicosConfig,
    ...coordenadorTopicosConfig,
    ...configuracoesTopicosConfig,
    ...pesquisaTopicosConfig,
    ...relatoriosTopicosConfig,
    ...relevanciasTopicosConfig,
    ...volumesTopicosConfig,
    ...painelTopicosConfig,
];

modulesConfig.forEach((modulo) => {
    modulo.ajuda.forEach((topico) => {
        topicosConfig = [
            ...topicosConfig,
            topico
        ];
    });
});
