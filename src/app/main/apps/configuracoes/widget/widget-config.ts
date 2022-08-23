import {Widget} from 'widgets/widget';

const widgetAcompanhamento = new Widget();
widgetAcompanhamento.ordem = 30;
widgetAcompanhamento.module = (): any => import('app/main/apps/configuracoes/widget/widget-acompanhamento/widget-acompanhamento.module').then(m => m.WidgetAcompanhamentoModule);
widgetAcompanhamento.role = 'ROLE_COLABORADOR';
widgetAcompanhamento.nome = 'Acompanhamentos';
widgetAcompanhamento.moduleName = 'WidgetAcompanhamentoModule'

const widgetAfastamentos = new Widget();
widgetAfastamentos.ordem = 40;
widgetAfastamentos.module = (): any => import('app/main/apps/configuracoes/widget/widget-afastamentos/widget-afastamentos.module').then(m => m.WidgetAfastamentosModule);
widgetAfastamentos.role = 'ROLE_COLABORADOR';
widgetAfastamentos.nome = 'Meus Próximos Afastamentos';
widgetAfastamentos.moduleName = 'WidgetAfastamentosModule'

export const widgetConfig =
    [
        widgetAfastamentos,
        widgetAcompanhamento
    ];
