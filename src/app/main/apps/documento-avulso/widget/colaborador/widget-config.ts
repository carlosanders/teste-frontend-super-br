import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 20;
widget.module = () => import('app/main/apps/documento-avulso/widget/colaborador/widget-documento-avulso.module').then(m => m.WidgetDocumentoAvulsoColaboradorModule);
widget.role = 'ROLE_COLABORADOR';

export const widgetConfig =
    [
        widget
    ];
