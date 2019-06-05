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
                type: 'collapsable',
                icon: 'check_box',
                children: [
                    {
                        id: 'minhasTarefas',
                        title: 'Minhas Tarefas',
                        translate: 'NAV.TAREFA.MINHASTAREFAS.TITLE',
                        type: 'item',
                        icon: 'person',
                        url: '/apps/tarefas/entrada',
                        badge: {
                            title: '13',
                            bg: '#EC0C8E',
                            fg: '#FFFFFF'
                        }
                    },
                    {
                        id: 'compartilhadasComigo',
                        title: 'Compartilhadas',
                        translate: 'NAV.TAREFA.COMPARTILHADASCOMIGO.TITLE',
                        type: 'item',
                        icon: 'share',
                        url: '/apps/tarefas/compartilhadas',
                        badge: {
                            title: '5',
                            bg: '#EC0C8E',
                            fg: '#FFFFFF'
                        }
                    }
                ]
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
