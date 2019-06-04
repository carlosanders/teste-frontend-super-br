import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Aplicações',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'painel',
                title: 'Painel',
                translate: 'NAV.PAINEL.TITLE',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/painel'
            },
            {
                id: 'tarefas',
                title: 'Tarefas',
                translate: 'NAV.TAREFA.TITLE',
                type: 'item',
                icon: 'check_box',
                url: '/apps/tarefas/entrada',
                badge: {
                    title: '13',
                    translate: 'NAV.TAREFA.BADGE',
                    bg: '#EC0C8E',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'processo',
                title: 'Processos',
                translate: 'NAV.PROCESSO.TITLE',
                type: 'collapsable',
                icon: 'book',
                children: [
                    {
                        id: 'protocolo',
                        title: 'Novo',
                        translate: 'NAV.PROCESSO.PROTOCOLO.TITLE',
                        type: 'item',
                        icon: 'book',
                        url: '/apps/processo/criar/editar'
                    },
                    {
                        id: 'pesquisa',
                        title: 'Pesquisa',
                        translate: 'NAV.PROCESSO.PESQUISA.TITLE',
                        type: 'item',
                        icon: 'search',
                        url: '/apps/pesquisa'
                    }
                ]
            }
        ]
    }
];
