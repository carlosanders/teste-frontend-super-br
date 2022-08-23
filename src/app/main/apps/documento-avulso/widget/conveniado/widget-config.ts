import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 70;
widget.module = () => import('app/main/apps/documento-avulso/widget/conveniado/widget-documento-avulso.module').then(m => m.WidgetDocumentoAvulsoConveniadoModule);
widget.role = 'ROLE_PESSOA_VINCULADA';
widget.nome = 'Meus Ofícios';
widget.moduleName = 'WidgetDocumentoAvulsoConveniadoModule'

export const widgetConfig =
    [
        widget
    ];
