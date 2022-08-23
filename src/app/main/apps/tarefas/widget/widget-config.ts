import {Widget} from 'widgets/widget';

const widgetMinhasTarefas = new Widget();
widgetMinhasTarefas.ordem = 10;
widgetMinhasTarefas.module = () => import('app/main/apps/tarefas/widget/minhas-tarefas/widget-tarefa.module').then(m => m.WidgetTarefaModule);
widgetMinhasTarefas.role = 'ROLE_COLABORADOR';
widgetMinhasTarefas.nome = 'Minhas Tarefas';
widgetMinhasTarefas.moduleName = 'WidgetTarefaModule';

const widgetCompartilhadasComigo = new Widget();
widgetCompartilhadasComigo.ordem = 20;
widgetCompartilhadasComigo.module = () => import('app/main/apps/tarefas/widget/compartilhadas-comigo/widget-compartilhadas.module').then(m => m.WidgetCompartilhadasModule);
widgetCompartilhadasComigo.role = 'ROLE_COLABORADOR';
widgetCompartilhadasComigo.nome = 'Tarefas Compartilhadas Comigo';
widgetCompartilhadasComigo.moduleName = 'WidgetCompartilhadasModule';

const widgetGraficoTarefa = new Widget();
widgetGraficoTarefa.ordem = 5;
widgetGraficoTarefa.module = () => import('app/main/apps/tarefas/widget/grafico-minhas-tarefas/widget-grafico-tarefa.module').then(m => m.WidgetGraficoTarefaModule);
widgetGraficoTarefa.role = 'ROLE_COLABORADOR';
widgetGraficoTarefa.nome = 'Distribuição';
widgetGraficoTarefa.moduleName = 'WidgetGraficoTarefaModule';

export const widgetConfig =
    [
        widgetMinhasTarefas,
        widgetCompartilhadasComigo,
        widgetGraficoTarefa
    ];
