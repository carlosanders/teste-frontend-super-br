import {NgModule} from '@angular/core';
import {AjudaComponent} from './ajuda.component';
import {FuseSharedModule} from '../@fuse/shared.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule} from '@angular/material';
import { AjudaTarefaCreateModule } from 'app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module';
import { AjudaVisibilidadeModule } from 'app/main/apps/tarefas/visibilidade/ajuda/ajuda-visibilidade.module';
import { AjudaVinculacaoEtiquetaCreateBlocoModule } from 'app/main/apps/tarefas/vinculacao-etiqueta-create-bloco/ajuda/ajuda-vinculacao-etiqueta-create-bloco.module';
import { AjudaUploadBlocoModule } from 'app/main/apps/tarefas/upload-bloco/ajuda/ajuda-upload-bloco.module';
import { AjudaTarefaEditBlocoModule } from 'app/main/apps/tarefas/tarefa-edit-bloco/ajuda/ajuda-tarefa-edit-bloco.module';
import { AjudaAtividadeCreateModule } from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/ajuda/ajuda-atividade-create.module';
import { AjudaCompartilhamentoCreateModule } from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/ajuda/ajuda-compartilhamento-create.module';
import { AjudaModeloBlocoModule } from 'app/main/apps/tarefas/modelo-bloco/ajuda/ajuda-modelo-bloco.module';
import { AjudaDocumentoAvulsoCreateBlocoModule } from 'app/main/apps/tarefas/documento-avulso-create-bloco/ajuda/ajuda-documento-avulso-create-bloco.module';
import { AjudaCompartilhamentoCreateBlocoModule } from 'app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/ajuda-compartilhamento-create-bloco.module';

@NgModule({
    declarations: [
        AjudaComponent
    ],
    imports: [
        FuseSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        AjudaTarefaCreateModule,
        AjudaVisibilidadeModule,
        AjudaVinculacaoEtiquetaCreateBlocoModule,
        AjudaUploadBlocoModule,
        AjudaTarefaEditBlocoModule,
        AjudaAtividadeCreateModule,
        AjudaCompartilhamentoCreateModule,
        AjudaModeloBlocoModule,
        AjudaDocumentoAvulsoCreateBlocoModule,
        AjudaCompartilhamentoCreateBlocoModule
        
    ],
    exports: [
        AjudaComponent
    ],
    providers: []
})
export class AjudaModule {
}
