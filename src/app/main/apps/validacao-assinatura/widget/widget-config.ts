import {Widget} from 'widgets/widget';

const widgetValidacaoAssinatura = new Widget();
widgetValidacaoAssinatura.ordem = 30;
widgetValidacaoAssinatura.module = () => import('app/main/apps/validacao-assinatura/widget/widget-validacao-assinatura.module').then(m => m.WidgetValidacaoAssinaturaModule);
widgetValidacaoAssinatura.role = 'ROLE_USER';
widgetValidacaoAssinatura.nome = 'Validação de Assinatura';
widgetValidacaoAssinatura.moduleName = 'WidgetValidacaoAssinaturaModule'

export const widgetConfig =
    [
        widgetValidacaoAssinatura,
    ];
