import {modulesConfig} from '../modules/modules-config';

import {widgetConfig as tarefasWidgetConfig} from '../app/main/apps/tarefas/widget/widget-config';
import {widgetConfig as documentosAvulsosWidgetConfig} from '../app/main/apps/documento-avulso/widget/widget-config';
import {widgetConfig as tramitacoesWidgetConfig} from '../app/main/apps/processo/widget/widget-config';
import {widgetConfig as alertaWidgetConfig} from '../app/main/apps/alerta-widget/widget-config';


export let widgetConfig = [
    ...tarefasWidgetConfig,
    ...documentosAvulsosWidgetConfig,
    ...tramitacoesWidgetConfig,
    ...alertaWidgetConfig,
];

modulesConfig.forEach((modulo) => {
    modulo.widgets?.forEach((widget) => {
        widgetConfig = [
            ...widgetConfig,
            widget
        ];
    });
});
