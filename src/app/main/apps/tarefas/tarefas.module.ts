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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

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
import { AssuntoService } from '@cdk/services/assunto.service';
import {AssuntoListStoreModule} from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store/store.module';
import {modulesConfig} from 'modules/modules-config';

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
                path: 'tarefa-edit-bloco',
                loadChildren: () => import('./tarefa-edit-bloco/tarefa-edit-bloco.module').then(m => m.TarefaEditBlocoModule),
            },
            {
                path: 'documento-avulso-bloco',
                loadChildren: () => import('./documento-avulso-create-bloco/documento-avulso-create-bloco.module').then(m => m.DocumentoAvulsoCreateBlocoModule),
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

        AssuntoListStoreModule
    ],
    providers: [
        TarefaService,
        FolderService,
        ProcessoService,
        EspecieTarefaService,
        SetorService,
        UsuarioService,
        LoginService,
        fromGuards.ResolveGuard,
        AssuntoService
    ]
})
export class TarefasModule {
}
