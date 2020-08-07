import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 1;
widget.module = () => import('app/main/apps/tarefas/widget/widget-tarefa.module').then(m => m.WidgetTarefaModule);

export const widgetConfig =
    [
        widget
    ];
