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

import * as fromGuards from './store/guards/index';
import {ProcessoStoreModule} from './store/store.module';
import {ProtocoloExternoComponent} from './protocolo-externo.component';
import {ProcessoMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {FolderService} from '@cdk/services/folder.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ResizableModule} from 'angular-resizable-element';
import {CdkProcessoListModule} from '@cdk/components/processo/cdk-processo-list/cdk-processo-list.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {DndModule} from 'ngx-drag-drop';
import {LoginService} from '../../auth/login/login.service';
import { AssuntoService } from '@cdk/services/assunto.service';
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';

const routes: Routes = [
    {
        path: ':pessoaHandle',
        component: ProtocoloExternoComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./protocolo-externo-empty/protocolo-externo-empty.module').then(m => m.ProtocoloExternoEmptyModule)
            },
            /*{
                path: 'criar',
                loadChildren: () => import('./tarefa-create/tarefa-create.module').then(m => m.TarefaCreateModule)
            },*/
            {
                path: 'detalhe',
                loadChildren: () => import('./protocolo-externo-detail/protocolo-externo-detail.module').then(m => m.ProtocoloExternoDetailModule),
            },
            /*{
                path: 'compartilhamento-bloco',
                loadChildren: () => import('./compartilhamento-create-bloco/compartilhamento-create-bloco.module').then(m => m.CompartilhamentoCreateBlocoModule),
            },
            {
                path: 'atividade-bloco',
                loadChildren: () => import('./atividade-create-bloco/atividade-create-bloco.module').then(m => m.AtividadeCreateBlocoModule),
            },*/
            {
                path: 'vinculacao-etiqueta-bloco',
                loadChildren: () => import('./vinculacao-etiqueta-create-bloco/vinculacao-etiqueta-create-bloco.module').then(m => m.VinculacaoEtiquetaCreateBlocoModule),
            },
            /*{
                path: 'protocolo-externo-bloco',
                loadChildren: () => import('./protocolo-externo-create-bloco/protocolo-externo-create-bloco.module').then(m => m.TarefaCreateBlocoModule),
            },*/
            /*{
                path: 'protocolo-externo-edit-bloco',
                loadChildren: () => import('./protocolo-externo-edit-bloco/protocolo-externo-edit-bloco.module').then(m => m.TarefaEditBlocoModule),
            },*/
            /*{
                path: 'documento-avulso-bloco',
                loadChildren: () => import('./documento-avulso-create-bloco/documento-avulso-create-bloco.module').then(m => m.DocumentoAvulsoCreateBlocoModule),
            },
            {
                path: 'upload-create-bloco',
                loadChildren: () => import('./upload-bloco/upload-bloco.module').then(m => m.UploadBlocoModule),
            },
            {
                path: 'modelo-bloco',
                loadChildren: () => import('./modelo-bloco/modelo-bloco.module').then(m => m.ModeloBlocoModule),
            },
            {
                path: 'visibilidade',
                loadChildren: () => import('./visibilidade/visibilidade.module').then(m => m.VisibilidadeModule),
            }*/
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'default'
    }
];

@NgModule({
    declarations: [
        ProtocoloExternoComponent,
        ProcessoMainSidebarComponent
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

        CdkProcessoListModule,
        CdkProcessoFormModule,

        CdkEtiquetaChipsModule,

        TranslateModule,

        ResizableModule,

        PipesModule,

        InfiniteScrollModule,

        CdkSharedModule,
        CdkSidebarModule,

        ProcessoStoreModule
    ],
    providers: [
        ProcessoService,
        FolderService,
        ProcessoService,
        EspecieProcessoService,
        SetorService,
        UsuarioService,
        LoginService,
        fromGuards.ResolveGuard,
        AssuntoService
    ]
})
export class ProtocoloExternoModule {
}
