import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 0;
widget.colspan = 2;
widget.rowspan = 1;
widget.module = () => import('widgets/widget-alerta/widget-alerta.module').then(m => m.WidgetAlertaModule);
widget.nome = 'Avisos';
widget.moduleName = 'WidgetAlertaModule';

export const widgetConfig =
    [
        widget
    ];
