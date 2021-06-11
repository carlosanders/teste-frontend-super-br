import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaCompartilhamentoCreateComponent} from './ajuda-compartilhamento-create.component';
import {AjudaVisibilidadesModule} from 'app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module';

import {CdkSharedModule} from '@cdk/shared.module';
import {AjudaCompartilhamentoCreateBlocoModule} from 'app/main/apps/tarefas/compartilhamento-create-bloco/ajuda/ajuda-compartilhamento-create-bloco.module';

@NgModule({
    declarations: [
        AjudaCompartilhamentoCreateComponent
    ],
    imports: [
        CdkSharedModule,
        AjudaVisibilidadesModule,
        AjudaCompartilhamentoCreateBlocoModule,
    ],
    providers: [
    ],
    exports:    [
        AjudaCompartilhamentoCreateComponent
    ]
})
export class AjudaCompartilhamentoCreateModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaCompartilhamentoCreateComponent> {
        return this.resolver.resolveComponentFactory(AjudaCompartilhamentoCreateComponent);
    }
}
