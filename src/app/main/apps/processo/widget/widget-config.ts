import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 2;
widget.module = () => import('app/main/apps/processo/widget/widget-tramitacao.module').then(m => m.WidgetTramitacaoModule);
widget.role = 'ROLE_COLABORADOR';

export const widgetConfig =
    [
        widget
    ];
