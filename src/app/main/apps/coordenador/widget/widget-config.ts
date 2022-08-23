import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 50;
widget.module = () => import('app/main/apps/coordenador/widget/widget-coordenador.module').then(m => m.WidgetCoordenadorModule);
widget.role = 'ROLE_COORDENADOR_SETOR';
widget.nome = 'Tarefas da Coordenação';
widget.moduleName = 'WidgetCoordenadorModule';
widget.isVisible = (usuario, loginService) => (!widget.role || widget.role && loginService.isGranted(widget.role)) && usuario?.coordenadores?.length > 0;

export const widgetConfig =
    [
        widget
    ];
