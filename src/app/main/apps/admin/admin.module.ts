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
import {AdminMainSidebarComponent} from "./sidebars/main/main-sidebar.component";
import {AdminStoreModule} from "./store/store.module";
import {SetorService} from "@cdk/services/setor.service";

const routes: Routes = [
    {
        path       : '',
        component: AdminComponent,
        children: [
            {
                path       : ':unidadeHandle/setor',
                loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : ':unidadeHandle/lotacoes',
                loadChildren: () => import('./lotacoes/admin-lotacoes.module').then(m => m.AdminLotacoesModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : ':unidadeHandle/localizador',
                loadChildren: () => import('./localizador/localizador.module').then(m => m.LocalizadorModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : ':unidadeHandle/numero-unico-documento',
                loadChildren: () => import('./numero-unico-documento/numero-unico-documento.module').then(m => m.NumeroUnicoDocumentoModule),
                canActivate: [fromGuards.ResolveGuard]
            }
        ]
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
        fromGuards.ResolveGuard
    ]
})
export class AdminModule
{
}
