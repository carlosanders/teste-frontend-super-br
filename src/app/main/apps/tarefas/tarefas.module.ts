import {NgModule} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components';
import {
    CdkAssinaturaEletronicaPluginComponent
} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {
    CdkAssinaturaEletronicaPluginModule
} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {
    CdkModeloAutocompleteModule
} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkSearchBarEtiquetasModule} from '@cdk/components/search-bar-etiquetas/search-bar-etiquetas.module';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {SnackBarDesfazerModule} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {CdkTarefaListModule} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.module';
import {
    CdkVinculacaoEtiquetaAcoesDialogModule
} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-acoes-dialog/cdk-vinculacao-etiqueta-acoes-dialog.module';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {AcaoService} from '@cdk/services/acao.service';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {AssuntoService} from '@cdk/services/assunto.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {FavoritoService} from '@cdk/services/favorito.service';
import {FolderService} from '@cdk/services/folder.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {SetorService} from '@cdk/services/setor.service';
import {TarefaService} from '@cdk/services/tarefa.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

import {CdkSharedModule} from '@cdk/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ResizableModule} from 'angular-resizable-element';
import {AssuntoListStoreModule} from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store/store.module';

import * as fromGuards from 'app/main/apps/tarefas/store/guards/index';
import {TarefasStoreModule} from 'app/main/apps/tarefas/store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {DndModule} from 'ngx-drag-drop';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TarefasMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {TarefasComponent} from './tarefas.component';

const routes: Routes = [
    {
        path: ':generoHandle/:typeHandle/:targetHandle',
        component: TarefasComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./tarefa-empty/tarefa-empty.module').then(m => m.TarefaEmptyModule)
            },
            {
                path: 'criar',
                loadChildren: () => import('./tarefa-create/tarefa-create.module').then(m => m.TarefaCreateModule)
            },
            {
                path: 'tarefa',
                loadChildren: () => import('./tarefa-detail/tarefa-detail.module').then(m => m.TarefaDetailModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'compartilhamento-bloco',
                loadChildren: () => import('./compartilhamento-create-bloco/compartilhamento-create-bloco.module').then(m => m.CompartilhamentoCreateBlocoModule),
            },
            {
                path: 'remove-compartilhamento-bloco',
                loadChildren: () => import('./compartilhamento-remove-bloco/compartilhamento-remove-bloco.module').then(m => m.CompartilhamentoRemoveBlocoModule),
            },
            {
                path: 'atividade-bloco',
                loadChildren: () => import('./atividade-create-bloco/atividade-create-bloco.module').then(m => m.AtividadeCreateBlocoModule),
            },
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: () => import('./vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module').then(m => m.VinculacaoEtiquetaCreateBlocoModule),
            },
            {
                path: 'tarefa-bloco',
                loadChildren: () => import('./tarefa-create-bloco/tarefa-create-bloco.module').then(m => m.TarefaCreateBlocoModule),
            },
            {
                path: 'tarefa-editar-bloco',
                loadChildren: () => import('./tarefa-edit-bloco/tarefa-edit-bloco.module').then(m => m.TarefaEditBlocoModule),
            },
            {
                path: 'documento-avulso-bloco',
                loadChildren: () => import('./documento-avulso-create-bloco/documento-avulso-create-bloco.module').then(m => m.DocumentoAvulsoCreateBlocoModule),
            },
            {
                path: 'remeter-oficios-bloco',
                loadChildren: () => import('./remeter-oficios-bloco/remeter-oficios-bloco.module').then(m => m.RemeterOficiosBlocoModule),
            },
            {
                path: 'upload-bloco',
                loadChildren: () => import('./upload-bloco/upload-bloco.module').then(m => m.UploadBlocoModule),
            },
            {
                path: 'modelo-bloco',
                loadChildren: () => import('./modelo-bloco/modelo-bloco.module').then(m => m.ModeloBlocoModule),
            },
            {
                path: 'visibilidade',
                loadChildren: () => import('./visibilidade/visibilidade.module').then(m => m.VisibilidadeModule),
            },
            {
                path: 'redistribuicao-edit-bloco',
                loadChildren: () => import('./redistribuicao-edit-bloco/redistribuicao-edit-bloco.module').then(m => m.RedistribuicaoEditBlocoModule),
            },
            {
                path: 'operacoes-bloco',
                loadChildren: () => import('./operacoes-bloco/tarefas-operacoes-bloco.module').then(m => m.TarefasOperacoesBlocoModule),
            },
            {
                path: 'encaminhamento-bloco',
                loadChildren: () => import('./encaminhamento-bloco/encaminhamento-bloco.module').then(m => m.EncaminhamentoBlocoModule)
            },
            {
                path: 'minutas',
                loadChildren: () => import('./minutas/minutas.module').then(m => m.MinutasModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'entrada'
    }
];

const path = 'app/main/apps/tarefas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TarefasComponent,
        TarefasMainSidebarComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatDividerModule,
        DndModule,
        CdkTarefaListModule,
        CdkTarefaFormModule,
        CdkEtiquetaChipsModule,
        TranslateModule,
        ResizableModule,
        PipesModule,
        InfiniteScrollModule,
        CdkSharedModule,
        CdkSidebarModule,
        TarefasStoreModule,
        AssuntoListStoreModule,
        SnackBarDesfazerModule,
        MatBadgeModule,
        CdkAssinaturaEletronicaPluginModule,
        CdkSearchBarEtiquetasModule,
        CdkModeloAutocompleteModule,
        CdkVinculacaoEtiquetaAcoesDialogModule
    ],
    providers: [
        TarefaService,
        AssinaturaService,
        FolderService,
        ProcessoService,
        EspecieTarefaService,
        SetorService,
        UsuarioService,
        LotacaoService,
        fromGuards.ResolveGuard,
        AssuntoService,
        InteressadoService,
        DocumentoService,
        VinculacaoEspecieProcessoWorkflowService,
        VinculacaoEtiquetaService,
        AcaoService,
        FavoritoService
    ],
    entryComponents: [
        SnackBarDesfazerComponent,
        CdkAssinaturaEletronicaPluginComponent
    ],
})
export class TarefasModule {
}
