import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';


import {AjudaAtividadeCreateComponent} from './ajuda-atividade-create.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {AjudaAtividadeCreateBlocoModule} from 'app/main/apps/tarefas/atividade-create-bloco/ajuda/ajuda-atividade-create-bloco.module';
import {AjudaOficiosModule} from 'app/main/apps/oficios/ajuda/ajuda-oficios.module';

@NgModule({
    declarations: [
        AjudaAtividadeCreateComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaAtividadeCreateBlocoModule,
        AjudaOficiosModule,
    ],
    providers: [
    ],
    exports:    [
        AjudaAtividadeCreateComponent
    ]
})
export class AjudaAtividadeCreateModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaAtividadeCreateComponent> {
        return this.resolver.resolveComponentFactory(AjudaAtividadeCreateComponent);
    }
}
