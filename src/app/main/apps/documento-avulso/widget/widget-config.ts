import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 2;
widget.module = () => import('app/main/apps/documento-avulso/widget/widget-documento-avulso.module').then(m => m.WidgetDocumentoAvulsoModule);

export const widgetConfig =
    [
        widget
    ];
