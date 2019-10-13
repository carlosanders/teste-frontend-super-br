export const modulesConfig = [
    {
        name: 'judicial',
        generoProcesso: ['JUDICIAL'],
        routes: {
            'app/main/apps/processo/processo-edit': [
                {
                    path: 'dados-basicos-judicial',
                    // tslint:disable-next-line:max-line-length
                    loadChildren: () => import(
                        'modules/judicial/app/main/apps/processo/processo-edit/dados-basicos/dados-basicos-judicial.module'
                        ).then(m => m.DadosBasicosJudicialModule)
                }
            ]
        },
        mainMenu: [{
            id: 'protocolo',
            entries: [{
                    id: 'judicial',
                    title: 'Judicial',
                    type: 'item',
                    icon: 'book',
                    url: '/apps/processo/criar/editar/dados-basicos-judicial'
                }]
        }],
        sidebars: {
            'app/main/apps/processo/processo-edit/sidebars/main': [
                {
                    nome: 'Processo Judicial',
                    link: 'processo-judicial'
                }
            ]
        },
        components: {
            'app/main/apps/tarefas/tarefa-detail': [
                () => import('modules/judicial/app/main/apps/tarefas/tarefa-detail/button1.module').then(m => {
                    return {module: m.Button1Module, componentIndex: 0};
                })
            ]
        }
    }
];
