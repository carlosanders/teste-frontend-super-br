import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {TarefaDetailComponent} from './tarefa-detail.component';
import {CommonModule} from '@angular/common';

import * as fromGuards from './store/guards';

import {TarefaDetailStoreModule} from './store/store.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':tarefaHandle',
        component: TarefaDetailComponent,
        children: [
            {
                path: 'editar',
                loadChildren: () => import('./tarefa-edit/tarefa-edit.module').then(m => m.TarefaEditModule)
            },
            {
                path: 'criar',
                loadChildren: () => import('../tarefa-create/tarefa-create.module').then(m => m.TarefaCreateModule)
            },
            {
                path: 'atividades',
                loadChildren: () => import('./atividades/atividades.module').then(m => m.AtividadesModule)
            },
            {
                path: 'compartilhamentos',
                loadChildren: () => import('./compartilhamentos/compartilhamentos.module').then(m => m.CompartilhamentosModule)
            },
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule)
            },
            {
                path: 'modelo',
                loadChildren: () => import('app/main/apps/modelo/modelo.module').then(m => m.ModeloModule),
            },
            {
                path: 'oficio',
                loadChildren: () => import('app/main/apps/documento-avulso/documento-avulso-create/documento-avulso-create.module').then(m => m.DocumentoAvulsoCreateModule),
            },
            {
                path: 'encaminhamento',
                loadChildren: () => import('./encaminhamento/encaminhamento.module').then(m => m.EncaminhamentoModule),
            },
            {
                path: '**',
                redirectTo: 'editar'
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TarefaDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        TarefaDetailStoreModule,

        PipesModule,

        TranslateModule,

        CdkVinculacaoEtiquetaChipsModule,

        CdkSharedModule,
        CdkSidebarModule
    ],
    providers: [
        TarefaService,
        VinculacaoEtiquetaService,
        LoginService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class TarefaDetailModule {
}
