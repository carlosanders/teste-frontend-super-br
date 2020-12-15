import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CdkSharedModule} from '@cdk/shared.module';
import { modulesConfig } from '../../../modules/modules-config';
import {RoleGuard} from './role.guard';

const routes = [
    {
        path        : 'painel',
        loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_ADMIN']}
    },
    {
        path        : 'arquivista',
        loadChildren: () => import('./arquivista/arquivista.module').then(m => m.ArquivistaModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_ARQUIVISTA']}
    },
    {
        path        : 'coordenador',
        loadChildren: () => import('./coordenador/coordenador.module').then(m => m.CoordenadorModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_COORDENADOR']}
    },
    {
        path        : 'tarefas',
        loadChildren: () => import('./tarefas/tarefas.module').then(m => m.TarefasModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_COLABORADOR']}
    },
    {
        path        : 'processo',
        loadChildren: () => import('./processo/processo.module').then(m => m.ProcessoModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'documento',
        loadChildren: () => import('./documento/documento.module').then(m => m.DocumentoModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_COLABORADOR']}
    },
    {
        path        : 'pesquisa',
        loadChildren: () => import('./pesquisa/pesquisa.module').then(m => m.PesquisaModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'configuracoes',
        loadChildren: () => import('./configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'oficios',
        loadChildren: () => import('./oficios/oficios.module').then(m => m.OficiosModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'protocolo-externo',
        loadChildren: () => import('./protocolo-externo/protocolo-externo.module').then(m => m.ProtocoloExternoModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_USER']}
    },
    {
        path        : 'calendario',
        loadChildren: () => import('./calendario/calendar.module').then(m => m.CalendarModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_COLABORADOR']}
    },
    {
        path        : 'relatorios',
        loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule),
        canActivate: [RoleGuard],
        data: {roles: ['ROLE_COLABORADOR']}
    }
];

const path = 'app/main/apps';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes.push(r)));
    }
});

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        CdkSharedModule,
    ],
    providers   : [
        RoleGuard
    ]
})
export class AppsModule
{
}
