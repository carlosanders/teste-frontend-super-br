import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaTramitacoesComponent} from './ajuda-tramitacoes.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTramitacoesComponent
    ],
    imports: [
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        AjudaTramitacoesComponent
    ]
})
export class AjudaTramitacoesModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaTramitacoesComponent> {
        return this.resolver.resolveComponentFactory(AjudaTramitacoesComponent);
    }
}
