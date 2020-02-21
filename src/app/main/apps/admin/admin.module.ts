import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatProgressSpinnerModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import {AdminMainSidebarComponent} from "./sidebars/main/main-sidebar.component";

const routes: Routes = [
    {
        path       : '',
        component: AdminComponent,
        children: [
            {
                path       : 'setor',
                loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule)
            },
            {
                path       : 'lotacoes',
                loadChildren: () => import('./lotacoes/lotacoes.module').then(m => m.LotacoesModule)
            },
            {
                path       : 'localizador',
                loadChildren: () => import('./localizador/localizador.module').then(m => m.LocalizadorModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'perfil'
    }
];

@NgModule({
    declarations   : [
        AdminComponent,
        AdminMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
    ]
})
export class AdminModule
{
}
