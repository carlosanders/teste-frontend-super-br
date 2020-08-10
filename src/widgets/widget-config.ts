import {modulesConfig} from '../modules/modules-config';

import {widgetConfig as tarefasWidgetConfig} from 'app/main/apps/tarefas/widget/widget-config';
import {widgetConfig as documentosAvulsosColaboradorWidgetConfig} from 'app/main/apps/documento-avulso/widget/colaborador/widget-config';
import {widgetConfig as documentosAvulsosConveniadoWidgetConfig} from 'app/main/apps/documento-avulso/widget/conveniado/widget-config';
import {widgetConfig as tramitacoesWidgetConfig} from 'app/main/apps/processo/widget/widget-config';
import {widgetConfig as pessoasWidgetConfig} from 'app/main/apps/admin/widget/pessoa/widget-config';
import {widgetConfig as tarefasCoordenacaoWidgetConfig} from 'app/main/apps/coordenador/widget/tarefas-pendentes/widget-config';
import {widgetConfig as alertaWidgetConfig} from 'app/main/apps/widget-alerta/widget-config';


export let widgetConfig = [
    ...tarefasWidgetConfig,
    ...documentosAvulsosColaboradorWidgetConfig,
    ...documentosAvulsosConveniadoWidgetConfig,
    ...tramitacoesWidgetConfig,
    ...pessoasWidgetConfig,
    ...tarefasCoordenacaoWidgetConfig,
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