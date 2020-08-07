import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 999;
widget.module = () => import('app/main/apps/widget-alerta/widget-alerta.module').then(m => m.WidgetAlertaModule);

export const widgetConfig =
    [
        widget
    ];
