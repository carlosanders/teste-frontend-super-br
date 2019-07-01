import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import * as fromGuards from 'app/main/apps/tarefas/store/guards/index';
import {TarefasStoreModule} from 'app/main/apps/tarefas/store/store.module';
import {TarefasComponent} from 'app/main/apps/tarefas/tarefas.component';
import {TarefasMainSidebarComponent} from 'app/main/apps/tarefas/sidebars/main/main-sidebar.component';
import {TarefaService} from '@cdk/services/tarefa.service';
import {FolderService} from '@cdk/services/folder.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ResizableModule} from 'angular-resizable-element';
import {CdkTarefaListModule} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {DndModule} from 'ngx-drag-drop';
import {LoginService} from '../../auth/login/login.service';

const routes: Routes = [
    {
        path: ':folderHandle',
        component: TarefasComponent,
        children: [
            {
                path: '',
                loadChildren: './tarefa-empty/tarefa-empty.module#TarefaEmptyModule'
            },
            {
                path: 'criar',
                loadChildren: './tarefa-create/tarefa-create.module#TarefaCreateModule'
            },
            {
                path: 'tarefa',
                loadChildren: './tarefa-detail/tarefa-detail.module#TarefaDetailModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'compartilhamento-bloco',
                loadChildren: './compartilhamento-create-bloco/compartilhamento-create-bloco.module#CompartilhamentoCreateBlocoModule',
            },
            {
                path: 'atividade-bloco',
                loadChildren: './atividade-create-bloco/atividade-create-bloco.module#AtividadeCreateBlocoModule',
            },
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: './vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module#VinculacaoEtiquetaCreateBlocoModule',
            },
            {
                path: 'tarefa-bloco',
                loadChildren: './tarefa-create-bloco/tarefa-create-bloco.module#TarefaCreateBlocoModule',
            },
            {
                path: 'tarefa-edit-bloco',
                loadChildren: './tarefa-edit-bloco/tarefa-edit-bloco.module#TarefaEditBlocoModule',
            },
            {
                path: 'documento-avulso-bloco',
                loadChildren: './documento-avulso-create-bloco/documento-avulso-create-bloco.module#DocumentoAvulsoCreateBlocoModule',
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'entrada'
    }
];

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

        DndModule,

        CdkTarefaListModule,
        CdkTarefaFormModule,

        CdkEtiquetaChipsModule,

        TranslateModule,

        ResizableModule,

        PipesModule,

        InfiniteScrollModule,

        FuseSharedModule,
        FuseSidebarModule,

        TarefasStoreModule
    ],
    providers: [
        TarefaService,
        FolderService,
        ProcessoService,
        EspecieTarefaService,
        SetorService,
        UsuarioService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class TarefasModule {
}
