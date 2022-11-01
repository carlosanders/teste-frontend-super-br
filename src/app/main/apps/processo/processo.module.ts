import {NgModule} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import * as fromGuards from 'app/main/apps/processo/store/guards/index';
import {ProcessoStoreModule} from './store/store.module';
import {ProcessoComponent} from './processo.component';
import {ProcessoMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {CommonModule} from '@angular/common';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {ProcessoDownloadModule} from './processo-download/processo-download.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {modulesConfig} from 'modules/modules-config';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {StatusBarramentoService} from '@cdk/services/status-barramento';
import {MatCardModule} from '@angular/material/card';
import {TarefaService} from '@cdk/services/tarefa.service';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: ProcessoComponent,
        children: [
            {
                path: 'visualizar',
                loadChildren: () => import('./processo-view/processo-view.module').then(m => m.ProcessoViewModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'chave/:chaveAcessoHandle/visualizar',
                loadChildren: () => import('./processo-view/processo-view.module').then(m => m.ProcessoViewModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'editar',
                loadChildren: () => import('./processo-edit/processo-edit.module').then(m => m.ProcessoEditModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'acesso-negado',
                loadChildren: () => import('./processo-acesso-negado/processo-acesso-negado.module').then(m => m.ProcessoAcessoNegadoModule)
            },
            {
                path: 'download',
                loadChildren: () => import('./processo-download/processo-download.module').then(m => m.ProcessoDownloadModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'download/:chaveAcessoHandle',
                loadChildren: () => import('./processo-download/processo-download.module').then(m => m.ProcessoDownloadModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'processo-capa',
                loadChildren: () => import('./processo-capa/processo-capa.module').then(m => m.ProcessoCapaModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'etiqueta',
                loadChildren: () => import('./processo-etiqueta-view/processo-etiqueta-view.module').then(m => m.ProcessoEtiquetaViewModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'relatorio',
                loadChildren: () => import('./processo-relatorio-view/processo-relatorio-view.module').then(m => m.ProcessoRelatorioViewModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'envia-email',
                loadChildren: () => import('./processo-envia-email/processo-envia-email.module').then(m => m.ProcessoEnviaEmailModule),
            },
            {
                path: 'dossies',
                loadChildren: () => import('./processo-solicitar-dossies/processo-solicitar-dossies.module').then(m => m.ProcessoSolicitarDossiesModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'timeline',
                loadChildren: () => import('./processo-timeline/processo-timeline.module').then(m => m.ProcessoTimelineModule),
                canActivate: [fromGuards.ResolveGuard]
            },
        ]
    }
];

const path = 'app/main/apps/processo';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

routes[0].children.push({
    path: '**',
    redirectTo: 'visualizar'
});

@NgModule({
    declarations: [
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
        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        CdkVinculacaoEtiquetaChipsModule,
        ProcessoDownloadModule,
        MatMenuModule,
        MatRippleModule,
        MatCardModule,
        MatBadgeModule
    ],
    providers: [
        ProcessoService,
        VinculacaoEtiquetaService,
        AcompanhamentoService,
        StatusBarramentoService,
        TarefaService,
        fromGuards.ResolveGuard
    ],
})
export class ProcessoModule {
}
