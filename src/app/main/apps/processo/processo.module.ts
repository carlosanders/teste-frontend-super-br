import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import * as fromGuards from 'app/main/apps/processo/store/guards/index';

import { ProcessoStoreModule } from './store/store.module';

import { ProcessoComponent } from 'app/main/apps/processo/processo.component';
import { ProcessoMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { ProcessoService } from '@cdk/services/processo.service';
import { CommonModule } from '@angular/common';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {LoginService} from '../../auth/login/login.service';
import {ProcessoDownloadModule} from './processo-download/processo-download.module';

const routes: Routes = [
    {
        path       : ':processoHandle',
        component: ProcessoComponent,
        children: [
            {
                path       : 'visualizar',
                loadChildren: () => import('./processo-view/processo-view.module').then(m => m.ProcessoViewModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'editar',
                loadChildren: () => import('./processo-edit/processo-edit.module').then(m => m.ProcessoEditModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'acesso-negado',
                loadChildren: () => import('./processo-acesso-negado/processo-acesso-negado.module').then(m => m.ProcessoAcessoNegadoModule)
            },
            {
                path       : 'download',
                loadChildren: () => import('./processo-download/processo-download.module').then(m => m.ProcessoDownloadModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: '**',
                redirectTo: 'visualizar'
            }
        ]
    }
];

@NgModule({
    declarations   : [
        ProcessoComponent,
        ProcessoMainSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,

        TranslateModule,

        ProcessoStoreModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatTooltipModule,
        CdkVinculacaoEtiquetaChipsModule,
        ProcessoDownloadModule
    ],
    providers      : [
        ProcessoService,
        VinculacaoEtiquetaService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class ProcessoModule
{
}
