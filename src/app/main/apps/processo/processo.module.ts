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

const routes: Routes = [
    {
        path       : ':processoHandle',
        component: ProcessoComponent,
        children: [
            {
                path       : 'visualizar',
                loadChildren: './processo-view/processo-view.module#ProcessoViewModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'editar',
                loadChildren: './processo-edit/processo-edit.module#ProcessoEditModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'acesso-negado',
                loadChildren: './processo-empty/processo-empty.module#ProcessoEmptyModule'
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
        CdkVinculacaoEtiquetaChipsModule
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
