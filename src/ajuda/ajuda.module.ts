import {NgModule} from '@angular/core';
import {AjudaComponent} from './ajuda.component';
import { AjudaTarefaCreateModule } from 'app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module';
import { AjudaVinculacaoEtiquetaCreateBlocoModule } from 'app/main/apps/tarefas/vinculacao-etiqueta-create-bloco/ajuda/ajuda-vinculacao-etiqueta-create-bloco.module';
import { AjudaUploadBlocoModule } from 'app/main/apps/tarefas/upload-bloco/ajuda/ajuda-upload-bloco.module';
import { AjudaTarefaEditBlocoModule } from 'app/main/apps/tarefas/tarefa-edit-bloco/ajuda/ajuda-tarefa-edit-bloco.module';
import { AjudaAtividadeCreateModule } from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/ajuda/ajuda-atividade-create.module';
import { AjudaAtividadeCreateBlocoModule } from 'app/main/apps/tarefas/atividade-create-bloco/ajuda/ajuda-atividade-create-bloco.module';
import { AjudaCompartilhamentoCreateModule } from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/ajuda/ajuda-compartilhamento-create.module';
import { AjudaModeloBlocoModule } from 'app/main/apps/tarefas/modelo-bloco/ajuda/ajuda-modelo-bloco.module';
import { AjudaDocumentoAvulsoCreateBlocoModule } from 'app/main/apps/tarefas/documento-avulso-create-bloco/ajuda/ajuda-documento-avulso-create-bloco.module';
import { AjudaCompartilhamentoCreateBlocoModule } from 'app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/ajuda-compartilhamento-create-bloco.module';
import { AjudaProcessoEditModule } from 'app/main/apps/processo/processo-edit/ajuda/ajuda-processo-edit.module';
import { AjudaAssuntosModule } from 'app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module';
import { AjudaInteressadosModule } from 'app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module';
import { AjudaJuntadasModule } from 'app/main/apps/processo/processo-edit/juntadas/ajuda/ajuda-juntadas.module';
import { AjudaVinculacoesProcessosModule } from 'app/main/apps/processo/processo-edit/vinculacoes-processos/ajuda/ajuda-vinculacoes-processos.module';
import { AjudaOficiosModule } from 'app/main/apps/oficios/ajuda/ajuda-oficios.module';
import { AjudaTramitacoesModule } from 'app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-tramitacoes.module';
import { AjudaRemessasModule } from 'app/main/apps/processo/processo-edit/remessas/ajuda/ajuda-remessas.module';
import { AjudaTransicoesModule } from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';
import { AjudaSigilosModule } from 'app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module';
import { AjudaVisibilidadesModule } from 'app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module';

import {CdkSharedModule} from '../@cdk/shared.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule} from '@cdk/angular/material';
import { AjudaArquivistaModule } from 'app/main/apps/arquivista/ajuda/ajuda-arquivista.module';

@NgModule({
    declarations: [
        AjudaComponent
    ],
    imports: [
        CdkSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        AjudaTarefaCreateModule,
        AjudaVinculacaoEtiquetaCreateBlocoModule,
        AjudaUploadBlocoModule,
        AjudaTarefaEditBlocoModule,
        AjudaAtividadeCreateModule,
        AjudaAtividadeCreateBlocoModule,
        AjudaCompartilhamentoCreateModule,
        AjudaModeloBlocoModule,
        AjudaDocumentoAvulsoCreateBlocoModule,
        AjudaCompartilhamentoCreateBlocoModule,
        AjudaProcessoEditModule,
        AjudaAssuntosModule,
        AjudaInteressadosModule,
        AjudaJuntadasModule,
        AjudaVinculacoesProcessosModule,
        AjudaOficiosModule,
        AjudaTramitacoesModule,
        AjudaRemessasModule,
        AjudaTransicoesModule,
        AjudaSigilosModule,
        AjudaVisibilidadesModule,
        AjudaArquivistaModule,
    ],
    exports: [
        AjudaComponent
    ],
    providers: []
})
export class AjudaModule {
}
