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
                'modules/judicial/app/main/apps/tarefas/tarefa-detail/button1.module'
            ]
        }
    }
];
