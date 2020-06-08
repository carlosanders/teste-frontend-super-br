import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatRippleModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import { EtiquetaEditMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { EtiquetaEditComponent } from './etiqueta-edit.component';
import { CommonModule } from '@angular/common';
import * as fromGuards from './store/guards';
import {EtiquetaStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path       : ':etiquetaHandle',
        component: EtiquetaEditComponent,
        children: [
            {
                path       : 'dados-basicos',
                loadChildren: () => import('./dados-basicos/etiqueta-dados-basicos.module').then(m => m.EtiquetaDadosBasicosModule)
            },
            {
                path       : 'acoes',
                loadChildren: () => import('./acoes/acoes.module').then(m => m.AcoesModule)
            },
            {
                path       : '**',
                redirectTo: 'dados-basicos'
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers      : [
        fromGuards.ResolveGuard
    ]
})
export class EtiquetaEditModule
{
}
