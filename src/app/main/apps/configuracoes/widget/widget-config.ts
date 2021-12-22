import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 30;
widget.module = () => import('app/main/apps/configuracoes/widget/widget-acompanhamento.module').then(m => m.WidgetAcompanhamentoModule);
widget.role = 'ROLE_COLABORADOR';

export const widgetConfig =
    [
        widget
    ];
