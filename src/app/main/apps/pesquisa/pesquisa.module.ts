import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatRippleModule,
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {PesquisaComponent} from 'app/main/apps/pesquisa/pesquisa.component';
import {PesquisaMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CommonModule} from '@angular/common';
import {RouteGuard} from "./guard";

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
                loadChildren: () => import('./componentes-digitais/pesquisa-componentes-digitais.module').then(m => m.PesquisaComponentesDigitaisModule)
            },
            {
                path: '**',
                redirectTo: 'processos'
            }
        ]
    }
];

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
        MatRippleModule
    ],
    providers: [
    ]
})
export class PesquisaModule {
}
