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
                        title: 'Administrativas',
                        translate: 'NAV.TAREFA.ADMINISTRATIVAS.TITLE',
                        type: 'item',
                        icon: 'person',
                        url: '/apps/tarefas/entrada'
                    }
                ]
            },
            {
                id: 'protocolo',
                title: 'Protocolo',
                translate: 'NAV.PROTOCOLO.TITLE',
                type: 'collapsable',
                icon: 'book',
                children: [
                    {
                        id: 'administrativo',
                        title: 'Administrativo',
                        translate: 'NAV.PROTOCOLO.ADMINISTRATIVO.TITLE',
                        type: 'item',
                        icon: 'book',
                        url: '/apps/processo/criar/editar'
                    }
                ]
            },
            {
                id: 'pesquisa',
                title: 'Pesquisa',
                translate: 'NAV.PESQUISA.TITLE',
                type: 'collapsable',
                icon: 'search',
                url: '/apps/pesquisa/processos'
            }
        ]
    }
];
