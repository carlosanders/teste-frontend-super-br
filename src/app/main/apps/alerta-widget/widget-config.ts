import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 4;
widget.module = () => import('app/main/apps/alerta-widget/widget-alerta.module').then(m => m.WidgetAlertaModule);

export const widgetConfig =
    [
        widget
    ];
