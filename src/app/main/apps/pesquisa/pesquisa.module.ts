import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatRippleModule,} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {PesquisaComponent} from './pesquisa.component';
import {PesquisaMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CommonModule} from '@angular/common';
import {RouteGuard} from './guard';
import {modulesConfig} from 'modules/modules-config';
import {RoleGuard} from '../role.guard';
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
    {
        path: '',
        component: PesquisaComponent,
        children: [
            {
                path: 'processos',
                loadChildren: () => import('./processos/pesquisa-processos.module').then(m => m.PesquisaProcessosModule)
            },
            {
                path: 'processos/:NUPHandle',
                loadChildren: () => import('./processos/pesquisa-processos.module').then(m => m.PesquisaProcessosModule),
                canActivate: [RouteGuard]
            },
            {
                path: 'documentos',
                loadChildren: () => import('./componentes-digitais/pesquisa-componentes-digitais.module').then(m => m.PesquisaComponentesDigitaisModule),
                data: {roles: ['ROLE_COLABORADOR']},
                canActivate: [RoleGuard],
            },
            {
                path: 'protocolo-existente',
                loadChildren: () => import('../protocolo-externo/protocolo-existente/protocolo-existente.module').then(m => m.ProtocoloExistenteModule),
                data: {roles: ['ROLE_PESSOA_VINCULADA_CONVENIADA']},
                canActivate: [RoleGuard],
            },
            {
                path: '**',
                redirectTo: 'processos'
            }
        ]
    }
];

const path = 'app/main/apps/pesquisa';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.unshift(r)));
    }
});


@NgModule({
    declarations: [
        PesquisaComponent,
        PesquisaMainSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        MatExpansionModule
    ],
    providers: [
        RoleGuard
    ]
})
export class PesquisaModule {
}
