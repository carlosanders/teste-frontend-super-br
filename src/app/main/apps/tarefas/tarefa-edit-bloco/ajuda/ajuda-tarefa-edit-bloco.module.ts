import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaTarefaEditBlocoComponent} from './ajuda-tarefa-edit-bloco.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTarefaEditBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaTarefaEditBlocoComponent
    ]
})
export class AjudaTarefaEditBlocoModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaTarefaEditBlocoComponent> {
        return this.resolver.resolveComponentFactory(AjudaTarefaEditBlocoComponent);
    }
}
