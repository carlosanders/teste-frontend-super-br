import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {ArquivistaListComponent} from './arquivista-list.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkProcessoListModule} from '@cdk/components/processo/cdk-processo-list/cdk-processo-list.module';
import * as fromGuards from './store/guards';
import {ArquivistaStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {ResizableModule} from 'angular-resizable-element';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {LoginService} from '../../../auth/login/login.service';
import {LembreteService} from '@cdk/services/lembrete.service';
import {modulesConfig} from 'modules/modules-config';
import {TransicaoArquivistaStoreModule} from '../transicao-arquivista-bloco/store/store.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaListComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../arquivista-empty/arquivista-empty.module').then(m => m.ArquivistaEmptyModule)
            },
            {
                path: 'detalhe',
                loadChildren: () => import('../arquivista-detail/arquivista-detail.module').then(m => m.ArquivistaDetailModule)
            },
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: () => import('../vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module').then(m => m.VinculacaoEtiquetaCreateBlocoModule),
            },
            {
                path: 'arquivista-editar-bloco',
                loadChildren: () => import('../arquivista-edit-bloco/arquivista-edit-bloco.module').then(m => m.ArquivistaEditBlocoModule)
            },
            {
                path: 'temporalidade-destinacao-bloco',
                loadChildren: () => import('../transicao-arquivista-bloco/transicao-arquivista-bloco.module').then(m => m.TransicaoArquivistaBlocoModule)
            },
            {
                path: 'desarquivar-bloco',
                loadChildren: () => import('../transicao-arquivista-bloco/transicao-arquivista-bloco.module').then(m => m.TransicaoArquivistaBlocoModule)
            },
            {
                path: 'registrar-extravio-bloco',
                loadChildren: () => import('../transicao-arquivista-bloco/transicao-arquivista-bloco.module').then(m => m.TransicaoArquivistaBlocoModule)
            },
            {
                path: 'operacoes-bloco',
                loadChildren: () => import('../operacoes-bloco/arquivista-operacoes-bloco.module').then(m => m.ArquivistaOperacoesBlocoModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/arquivista/arquivista-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ArquivistaListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ResizableModule,
        MatIconModule,
        ArquivistaStoreModule,
        TransicaoArquivistaStoreModule,
        TranslateModule,
        CdkProcessoListModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
    ],
    providers: [
        fromGuards.ResolveGuard,
        ProcessoService,
        TransicaoService,
        LembreteService,
        ModalidadeTransicaoService,
        LoginService
    ]
})
export class ArquivistaListModule {
}
