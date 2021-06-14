import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaProcessoEditComponent} from './ajuda-processo-edit.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {AjudaAssuntosModule} from 'app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module';
import {AjudaTarefaCreateModule} from 'app/main/apps/tarefas/tarefa-create/ajuda/ajuda-tarefa-create.module';
import {AjudaInteressadosModule} from 'app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module';
import {AjudaJuntadasModule} from 'app/main/apps/processo/processo-edit/juntadas/ajuda/ajuda-juntadas.module';
import {AjudaVinculacoesProcessosModule} from 'app/main/apps/processo/processo-edit/vinculacoes-processos/ajuda/ajuda-vinculacoes-processos.module';
import {AjudaOficiosModule} from 'app/main/apps/oficios/ajuda/ajuda-oficios.module';
import {AjudaTramitacoesModule} from 'app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-tramitacoes.module';
import {AjudaRemessasModule} from 'app/main/apps/processo/processo-edit/remessas/ajuda/ajuda-remessas.module';
import {AjudaTransicoesModule} from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';
import {AjudaSigilosModule} from 'app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module';
import {AjudaVisibilidadesModule} from 'app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module';

@NgModule({
    declarations: [
        AjudaProcessoEditComponent
    ],
    imports: [
        CdkSharedModule,
        AjudaAssuntosModule,
        AjudaTarefaCreateModule,
        AjudaInteressadosModule,
        AjudaJuntadasModule,
        AjudaVinculacoesProcessosModule,
        AjudaOficiosModule,
        AjudaTramitacoesModule,
        AjudaRemessasModule,
        AjudaTransicoesModule,
        AjudaSigilosModule,
        AjudaVisibilidadesModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaProcessoEditComponent
   ]
})
export class AjudaProcessoEditModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaProcessoEditComponent> {
        return this.resolver.resolveComponentFactory(AjudaProcessoEditComponent);
    }
}
