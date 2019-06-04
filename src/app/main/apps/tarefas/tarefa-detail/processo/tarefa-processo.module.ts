import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatIconModule, MatProgressSpinnerModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import * as fromGuards from './store/guards/index';

import { TarefaProcessoStoreModule } from './store/store.module';

import { ProcessoComponent } from './processo.component';
import { ProcessoService } from '@cdk/services/processo.service';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path       : ':processoHandle',
        component: ProcessoComponent,
        children: [
            {
                path       : 'visualizar',
                loadChildren: 'app/main/apps/processo/processo-view/processo-view.module#ProcessoViewModule'
            },
            {
                path       : 'editar',
                loadChildren: 'app/main/apps/processo/processo-edit/processo-edit.module#ProcessoEditModule'
            },
            {
                path: '**',
                redirectTo: 'visualizar'
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations   : [
        ProcessoComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatProgressSpinnerModule,

        TarefaProcessoStoreModule,

        FuseSharedModule,
    ],
    providers      : [
        ProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class TarefaProcessoModule
{
}
