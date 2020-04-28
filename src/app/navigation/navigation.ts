import {CdkNavigation} from '@cdk/types';

export const navigation: CdkNavigation[] = [
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
                url: '/apps/painel',
                role: 'ROLE_USER'
            },
            {
                id: 'tarefas',
                title: 'Tarefas',
                translate: 'NAV.TAREFA.TITLE',
                type: 'collapsable',
                icon: 'check_box',
                children: [
                    {
                        id: 'administrativas',
                        title: 'Administrativas',
                        translate: 'NAV.TAREFA.ADMINISTRATIVAS.TITLE',
                        type: 'item',
                        icon: 'person',
                        url: '/apps/tarefas/administrativo/minhas-tarefas/entrada'
                    }
                ],
                role: 'ROLE_COLABORADOR'
            },
            {
                id: 'oficios',
                title: 'Ofícios',
                translate: 'NAV.OFICIO.TITLE',
                type: 'item',
                icon: 'archive',
                url: '/apps/oficios/entrada',
                role: 'ROLE_CONVENIADO'
            },
            {
                id: 'protocolo-externo',
                title: 'Protocolo',
                translate: 'NAV.PROTOCOLO_EXTERNO.TITLE',
                type: 'item',
                icon: 'check_box',
                url: '/apps/protocolo-externo',
                role: 'ROLE_CONVENIADO'
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
                        url: '/apps/processo/criar/editar/dados-basicos'
                    }
                ],
                role: 'ROLE_COLABORADOR'
            },
            {
                id: 'pesquisa',
                title: 'Pesquisa',
                translate: 'NAV.PESQUISA.TITLE',
                type: 'item',
                icon: 'search',
                url: '/apps/pesquisa/processos',
                role: 'ROLE_USER'
            }
        ]
    },
    {
        id: 'modulos',
        title: 'Módulos',
        translate: 'NAV.MODULES',
        type: 'group',
        children: [
            {
                id: 'super-admin',
                title: 'SuperAdmin',
                translate: 'NAV.SUPERADMIN.TITLE',
                type: 'item',
                icon: 'settings_applications',
                url: '/apps/super-admin',
                role: 'ROLE_ROOT'
            },
            {
                id: 'admin',
                title: 'Admin',
                translate: 'NAV.ADMIN.TITLE',
                type: 'item',
                icon: 'build',
                url: '/apps/admin',
                role: 'ROLE_ADMIN'
            },
            {
                id: 'arquivista',
                title: 'Arquivista',
                translate: 'NAV.ARQUIVISTA.TITLE',
                type: 'item',
                icon: 'archive',
                url: '/apps/arquivista',
                role: 'ROLE_ARQUIVISTA'
            },
            {
                id: 'coordenador',
                title: 'Coordenador',
                translate: 'NAV.COORDENADOR.TITLE',
                type: 'item',
                icon: 'tune',
                url: '/apps/coordenador/default',
                role: 'ROLE_COORDENADOR'
            }
        ]
    }
];


