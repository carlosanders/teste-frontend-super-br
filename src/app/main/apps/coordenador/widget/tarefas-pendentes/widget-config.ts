import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 4;
widget.module = () => import('app/main/apps/coordenador/widget/tarefas-pendentes/widget-tarefa.module').then(m => m.WidgetTarefaCoordenadorModule);
widget.role = 'ROLE_COORDENADOR';

export const widgetConfig =
    [
        widget
    ];
