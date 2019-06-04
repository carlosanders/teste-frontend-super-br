import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
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
                path: 'documentos',
                loadChildren: './documentos/pesquisa-documentos.module#PesquisaDocumentosModule'
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
