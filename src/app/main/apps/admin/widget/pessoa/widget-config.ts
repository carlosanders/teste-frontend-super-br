import {Widget} from 'widgets/widget';

const widget = new Widget();
widget.ordem = 3;
widget.module = () => import('app/main/apps/admin/widget/pessoa/widget-pessoa.module').then(m => m.WidgetPessoaModule);
widget.role = 'ROLE_ADMIN';

export const widgetConfig =
    [
        widget
    ];
