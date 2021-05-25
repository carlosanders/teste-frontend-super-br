import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';
import {AjudaTarefaCreateComponent} from './ajuda-tarefa-create.component';
import {AjudaAssuntosModule} from 'app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module';
import {AjudaInteressadosModule} from 'app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module';
import {AjudaTramitacoesModule} from 'app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-tramitacoes.module';
import {AjudaSigilosModule} from 'app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module';
import {AjudaVisibilidadesModule} from 'app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module';
import {AjudaTarefaEditBlocoModule} from 'app/main/apps/tarefas/tarefa-edit-bloco/ajuda/ajuda-tarefa-edit-bloco.module';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTarefaCreateComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaAssuntosModule,
        AjudaInteressadosModule,
        AjudaTramitacoesModule,
        AjudaSigilosModule,
        AjudaVisibilidadesModule,
        AjudaTarefaEditBlocoModule,
    ],
    providers: [],
    exports: [
        AjudaTarefaCreateComponent
    ]
})
export class AjudaTarefaCreateModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaTarefaCreateComponent> {
        return this.resolver.resolveComponentFactory(AjudaTarefaCreateComponent);
    }
}
