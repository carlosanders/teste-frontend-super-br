import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';


import {AjudaAtividadeCreateBlocoComponent} from './ajuda-atividade-create-bloco.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaAtividadeCreateBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaAtividadeCreateBlocoComponent
    ]
})
export class AjudaAtividadeCreateBlocoModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaAtividadeCreateBlocoComponent> {
        return this.resolver.resolveComponentFactory(AjudaAtividadeCreateBlocoComponent);
    }
}
