import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 3;
widget.module = () => import('app/main/apps/processo/widget/widget-tramitacao.module').then(m => m.WidgetTramitacaoModule);

export const widgetConfig =
    [
        widget
    ];
