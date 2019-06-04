import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ConfiguracoesComponent } from './configuracoes.component';
import { ConfiguracoesMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path       : '',
        component: ConfiguracoesComponent,
        children: [
            {
                path       : 'perfil',
                loadChildren: './profile/profile.module#ProfileModule'
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
        ConfiguracoesComponent,
        ConfiguracoesMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatProgressSpinnerModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
    ]
})
export class ConfiguracoesModule
{
}
