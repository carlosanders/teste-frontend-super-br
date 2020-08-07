import {modulesConfig} from '../modules/modules-config';

import {widgetConfig as tarefasWidgetConfig} from '../app/main/apps/tarefas/widget/widget-config';


export let widgetConfig = [
    ...tarefasWidgetConfig,
];

modulesConfig.forEach((modulo) => {
    modulo.widgets?.forEach((widget) => {
        widgetConfig = [
            ...widgetConfig,
            widget
        ];
    });
});
