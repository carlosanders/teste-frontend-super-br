import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
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
import {modulesConfig} from 'modules/modules-config';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {ProcessoStoreModule} from '../../processo/store/store.module';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {StatusBarramentoService} from '@cdk/services/status-barramento';
import {
    CdkTipoDocumentoAutocompleteModule
} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
    CdkComponenteDigitalCardListModule
} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {
    CdkVinculacaoEtiquetaAcoesDialogModule
} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-acoes-dialog/cdk-vinculacao-etiqueta-acoes-dialog.module';
import {AcaoService} from '@cdk/services/acao.service';

const routes: Routes = [
    {
        path: ':tarefaHandle',
        component: TarefaDetailComponent,
        children: [
            {
                path: 'empty',
                loadChildren: () => import('./empty/tarefa-empty.module').then(m => m.TarefaEmptyModule)
            },
            {
                path: 'editar',
                loadChildren: () => import('./tarefa-edit/tarefa-edit.module').then(m => m.TarefaEditModule)
            },
            {
                path: 'criar',
                loadChildren: () => import('../tarefa-create/tarefa-create.module').then(m => m.TarefaCreateModule)
            },
            {
                path: 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
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
                path: 'modelos',
                loadChildren: () => import('app/main/apps/modelos/modelos.module').then(m => m.ModelosModule),
            },
            {
                path: 'oficios',
                loadChildren: () => import('./oficios/oficios.module').then(m => m.OficiosModule)
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
                path: 'redistribuicao',
                loadChildren: () => import('./redistribuicao-edit/redistribuicao-edit.module').then(m => m.RedistribuicaoEditModule),
            },
            {
                path: 'minutas',
                loadChildren: () => import('../minutas/minutas.module').then(m => m.MinutasModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

routes[0].children.push({
    path: '**',
    redirectTo: 'empty'
});

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
        ProcessoStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkTipoDocumentoAutocompleteModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        CdkComponenteDigitalCardListModule,
        CdkVinculacaoEtiquetaAcoesDialogModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        AcompanhamentoService,
        TarefaService,
        VinculacaoEtiquetaService,
        DocumentoService,
        fromGuards.ResolveGuard,
        ModalidadeEtiquetaService,
        EtiquetaService,
        StatusBarramentoService,
        AcaoService
    ]
})
export class TarefaDetailModule {
}
