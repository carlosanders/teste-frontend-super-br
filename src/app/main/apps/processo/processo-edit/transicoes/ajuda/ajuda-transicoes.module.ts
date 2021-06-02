import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';


import {AjudaTransicoesComponent} from './ajuda-transicoes.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTransicoesComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,

    ],
    providers: [
    ],
    exports: [
        AjudaTransicoesComponent
    ]
})
export class AjudaTransicoesModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaTransicoesComponent> {
        return this.resolver.resolveComponentFactory(AjudaTransicoesComponent);
    }
}
