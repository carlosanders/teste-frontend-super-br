import {modulesConfig} from '../modules/modules-config';

import {widgetConfig as coordenadorWidgetConfig} from 'app/main/apps/coordenador/widget/widget-config';
import {widgetConfig as tarefasWidgetConfig} from 'app/main/apps/tarefas/widget/widget-config';
import {widgetConfig as documentosAvulsosColaboradorWidgetConfig} from 'app/main/apps/documento-avulso/widget/colaborador/widget-config';
import {widgetConfig as documentosAvulsosConveniadoWidgetConfig} from 'app/main/apps/documento-avulso/widget/conveniado/widget-config';
import {widgetConfig as tramitacoesWidgetConfig} from 'app/main/apps/processo/widget/widget-config';
import {widgetConfig as alertaWidgetConfig} from './widget-alerta/widget-config';
import {widgetConfig as historicoWidgetConfig} from './widget-historico/widget-config';

export let widgetConfig = [
    ...coordenadorWidgetConfig,
    ...tarefasWidgetConfig,
    ...documentosAvulsosColaboradorWidgetConfig,
    ...documentosAvulsosConveniadoWidgetConfig,
    ...tramitacoesWidgetConfig,
    ...alertaWidgetConfig,
    ...historicoWidgetConfig
];

modulesConfig.forEach((modulo) => {
    modulo.widgets?.forEach((widget) => {
        widgetConfig = [
            ...widgetConfig,
            widget
        ];
    });
});
