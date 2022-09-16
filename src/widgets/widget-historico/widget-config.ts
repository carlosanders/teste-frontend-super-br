import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 100;
widget.colspan = 2;
widget.rowspan = 1;
widget.role = 'ROLE_COLABORADOR';
widget.module = () => import('widgets/widget-historico/widget-historico.module').then(m => m.WidgetHistoricoModule);
widget.nome = 'Histórico';
widget.moduleName = 'WidgetHistoricoModule'

export const widgetConfig =
    [
        widget
    ];
