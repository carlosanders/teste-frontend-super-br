import { modulesConfig } from '../modules/modules-config';

import { notificationConfig as notificationConfigDefault } from 'notification/default/notification-config';
import { notificationConfig as notificationConfigRelatorio } from 'notification/relatorio/notification-config';
import { notificationConfig as notificationConfigProcesso } from 'notification/processo/notification-config';
import { notificationConfig as notificationConfigTarefa } from 'notification/tarefa/notification-config';

export let notificationConfig = [
    ...notificationConfigDefault,
    ...notificationConfigRelatorio,
    ...notificationConfigProcesso,
    ...notificationConfigTarefa
];

modulesConfig.forEach((modulo) => {
    modulo.notifications?.forEach((notificacao) => {
        notificationConfig = [
            ...notificationConfig,
            notificacao
        ];
    });
});
