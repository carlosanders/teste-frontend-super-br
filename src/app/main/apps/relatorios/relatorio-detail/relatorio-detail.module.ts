import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {RelatorioDetailComponent} from './relatorio-detail.component';
import {CommonModule} from '@angular/common';

import * as fromGuards from './store/guards';

import {RelatorioDetailStoreModule} from './store/store.module';
import {RelatorioService} from '@cdk/services/relatorio.service';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':relatorioHandle',
        component: RelatorioDetailComponent,
        children: [
            {
                path: 'editar',
                loadChildren: () => import('./relatorio-edit/relatorio-edit.module').then(m => m.RelatorioEditModule)
            },
            {
                path: 'criar',
                loadChildren: () => import('../relatorio-create/relatorio-create.module').then(m => m.RelatorioCreateModule)
            },
            {
                path: 'visualizar',
                loadChildren: () => import('./relatorio-view/relatorio-view.module').then(m => m.RelatorioViewModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: '**',
                redirectTo: 'editar'
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/relatorios/relatorio-detail';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelatorioDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        RelatorioDetailStoreModule,

        PipesModule,

        TranslateModule,

        CdkVinculacaoEtiquetaChipsModule,

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers: [
        RelatorioService,
        VinculacaoEtiquetaService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class RelatorioDetailModule {
}
