import {CdkNavigation} from '@cdk/types';
import {modulesConfig} from '../../modules/modules-config';

export let navigationConverter = {
    'arquivistico': 'arquivístico'
};

modulesConfig.forEach((module) => {
    if (module.navigationConverter?.hasOwnProperty('mainMenu')) {
        navigationConverter = {
            ...navigationConverter,
            ...module.navigationConverter.mainMenu
        };
    }
});

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
                        id: 'tarefas_pendentes_administrativo',
                        title: 'Administrativas',
                        translate: 'NAV.TAREFA.ADMINISTRATIVAS.TITLE',
                        type: 'item',
                        icon: 'person',
                        url: '/apps/tarefas/administrativo/minhas-tarefas/entrada',
                        badge: {
                            title: '0',
                            bg : '#F44336',
                            fg: '#FFFFFF'
                        },
                        role: 'ROLE_COLABORADOR'
                    },
                    {
                        id: 'tarefas_pendentes_arquivístico',
                        title: 'Arquivísticas',
                        type: 'item',
                        icon: 'archive',
                        url: '/apps/tarefas/arquivistico/minhas-tarefas/entrada',
                        badge: {
                            title: '0',
                            bg : '#F44336',
                            fg: '#FFFFFF'
                        },
                        role: 'ROLE_COLABORADOR'
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
                role: ['ROLE_PESSOA_VINCULADA', 'ROLE_DISCIPLINAR_INTERESSADO']
            },
            {
                id: 'protocolo-externo',
                title: 'Protocolo',
                translate: 'NAV.PROTOCOLO_EXTERNO.TITLE',
                type: 'item',
                icon: 'check_box',
                url: '/apps/protocolo-externo/meus-processos/entrada',
                role: 'ROLE_USUARIO_EXTERNO_VALIDADO'
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
                        type: 'item',
                        icon: 'book',
                        url: '/apps/processo/criar/editar/dados-basicos-steps/administrativo'
                    },
                    {
                        id: 'caixa-email',
                        title: 'E-mail',
                        translate: 'NAV.CAIXA_EMAIL.TITLE',
                        type: 'item',
                        icon: 'mail',
                        role: 'ROLE_PROTOCOLO_EMAIL',
                        url: '/apps/caixa-email/default/default'
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
                id: 'relatorio',
                title: 'Relatórios',
                translate: 'NAV.RELATORIO.TITLE',
                type: 'item',
                icon: 'assessment',
                url: '/apps/relatorios/administrativo/meus-relatorios/entrada',
                role: 'ROLE_COLABORADOR'
            },
            {
                id: 'admin',
                title: 'Administrador',
                translate: 'NAV.ADMIN.TITLE',
                type: 'item',
                icon: 'build',
                url: '/apps/admin',
                role: ['ROLE_ADMIN', 'ROLE_*_ADMIN']
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
                role: 'ROLE_COORDENADOR',
                isCoordenador: true
            }
        ]
    }
];


