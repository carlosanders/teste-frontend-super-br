import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {PesquisaComponent} from 'app/main/apps/pesquisa/pesquisa.component';
import {PesquisaMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: PesquisaComponent,
        children: [
            {
                path: 'processos',
                loadChildren: './processos/pesquisa-processos.module#PesquisaProcessosModule'
            },
            {
                path: 'processos/:NUPHandle',
                loadChildren: './processos/pesquisa-processos.module#PesquisaProcessosModule'
            },
            {
                path: 'documentos',
                loadChildren: './componentes-digitais/pesquisa-componentes-digitais.module#PesquisaComponentesDigitaisModule'
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

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [
    ]
})
export class PesquisaModule {
}
