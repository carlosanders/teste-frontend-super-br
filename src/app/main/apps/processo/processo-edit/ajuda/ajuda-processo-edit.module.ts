import {NgModule} from '@angular/core';

import {AjudaProcessoEditComponent} from './ajuda-processo-edit.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';
import { AjudaAssuntosModule } from 'app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module';
import { AjudaTarefaCreateModule } from 'app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module';
import { AjudaInteressadosModule } from 'app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module';
import { AjudaJuntadasModule } from 'app/main/apps/processo/processo-edit/juntadas/ajuda/ajuda-juntadas.module';
import { AjudaVinculacoesProcessosModule } from 'app/main/apps/processo/processo-edit/vinculacoes-processos/ajuda/ajuda-vinculacoes-processos.module';
// import { AjudaOficiosModule } from 'app/main/apps/processo/processo-edit/oficios/ajuda/ajuda-interessados.module';
// import { AjudaTramitacoesModule } from 'app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-assuntos.module';
// import { AjudaRemessasModule } from 'app/main/apps/processo/processo-edit/remessas/ajuda/ajuda-assuntos.module';
// import { AjudaTransicoesModule } from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-interessados.module';
// import { AjudaSigilosModule } from 'app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-assuntos.module';
// import { AjudaRestricoesdeAcessoModule } from 'app/main/apps/processo/processo-edit/restricoesdeacesso/ajuda/ajuda-assuntos.module';
// import { AjudaProcessoJudicialModule } from 'app/main/apps/processo/processo-edit/processojudicial/ajuda/ajuda-interessados.module';

@NgModule({
    declarations: [
        AjudaProcessoEditComponent
    ],
    imports: [
        FuseSharedModule,
        AjudaAssuntosModule,
        AjudaTarefaCreateModule,
        AjudaInteressadosModule,
        AjudaJuntadasModule,
        AjudaVinculacoesProcessosModule,
        // AjudaOficiosModule,
        // AjudaTramitacoesModule,
        // AjudaRemessasModule,
        // AjudaTransicoesModule,
        // AjudaSigilosModule,
        // AjudaRestricoesdeAcessoModule,
        // AjudaProcessoJudicialModule,





    ],
    providers: [
    ],
    exports: [
        AjudaProcessoEditComponent
    ]
})
export class AjudaProcessoEditModule {
}