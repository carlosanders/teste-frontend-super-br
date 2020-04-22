import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatProgressSpinnerModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import * as fromGuards from './store/guards';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import {AdminMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {AdminStoreModule} from './store/store.module';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';

const routes: Routes = [
    {
        path       : ':unidadeHandle',
        component: AdminComponent,
        children: [
            {
                path       : 'setor',
                loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule)
            },
            {
                path       : 'usuario',
                loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'default/setor'
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

        AdminStoreModule,

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers      : [
        SetorService,
        UsuarioService,
        fromGuards.ResolveGuard
    ]
})
export class AdminModule
{
}
