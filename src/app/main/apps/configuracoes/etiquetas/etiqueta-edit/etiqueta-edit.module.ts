import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatRippleModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { EtiquetaEditMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { EtiquetaEditComponent } from './etiqueta-edit.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path       : '',
        component: EtiquetaEditComponent,
        children: [
            {
                path       : 'dados-basicos',
                loadChildren: './dados-basicos/etiqueta-dados-basicos.module#EtiquetaDadosBasicosModule'
            },
            {
                path       : 'acoes',
                loadChildren: './acoes/acoes.module#AcoesModule'
            },
            {
                path       : '**',
                redirectTo: 'dados-basicos'
            }
        ]
    }
];

@NgModule({
    declarations   : [
        EtiquetaEditComponent,
        EtiquetaEditMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatRippleModule,
        MatIconModule,
        MatButtonModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ]
})
export class EtiquetaEditModule
{
}
