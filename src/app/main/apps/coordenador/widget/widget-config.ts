import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 50;
widget.module = () => import('app/main/apps/coordenador/widget/widget-coordenador.module').then(m => m.WidgetCoordenadorModule);
widget.role = 'ROLE_COORDENADOR_SETOR';

export const widgetConfig =
    [
        widget
    ];
