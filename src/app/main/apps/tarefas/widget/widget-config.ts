import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 10;
widget.module = () => import('app/main/apps/tarefas/widget/widget-tarefa.module').then(m => m.WidgetTarefaModule);
widget.role = 'ROLE_COLABORADOR';

export const widgetConfig =
    [
        widget
    ];
