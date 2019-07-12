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
import * as fromGuards from './store/guards';
import {EtiquetaStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path       : ':etiquetaHandle',
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
        ],
        canActivate: [fromGuards.ResolveGuard]
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

        EtiquetaStoreModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
        fromGuards.ResolveGuard
    ]
})
export class EtiquetaEditModule
{
}
