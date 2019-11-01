import {modulesConfig} from '../modules/modules-config';

import {topicosConfig as tarefaCreateTopicosConfig} from '../app/main/apps/tarefas/tarefa-create/ajuda/topicos-config';

export let topicosConfig = [
    ...tarefaCreateTopicosConfig
];

modulesConfig.forEach((modulo) => {
    modulo.ajuda.forEach((topico) => {
        topicosConfig = [
            ...topicosConfig,
            topico
        ];
    });
});
