export const modulesConfigMarinha =
    {
        name: 'marinha',
        generoProcesso: [],
        routes: {
            // /apps/relatorios/administrativo/meus-relatorios/entrada
            // /apps/relatorios/administrativo/meus-relatorios/entrada
            'app/main/apps' :[
                {
                    path       : 'marinha/app/main/apps/navio',
                    loadChildren: () => import('modules/marinha/app/main/apps/navio/navio.module').then(m => m.NavioModule)
                },
            ]
        },
        components: {
        },
        sidebars: {
            // 'app/main/apps/coordenador/sidebars/main#setor': [
            //     {
            //         nome: 'Coordenadores',
            //         icon: 'tune',
            //         link: 'coordenadores',
            //         role: 'ROLE_COORDENADOR'
            //     }
            // ]
        },
        mainMenu: [
            {
                id: 'modulos',
                entries: [{
                    id: 'marinha',
                    title: 'Marinha',
                    type: 'item',
                    icon: 'book',
                    url: '/apps/marinha/app/main/apps/navio'
                }]
            },
        ],
        routerLinks: {
            
        },
        ajuda: [],
        widgets: [],
        generoAffinity: {},
        navigationConverter: {
            'mainMenu': {}
        }
    };
