import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaConfiguracoesComponent} from './ajuda-configuracoes.component';
import {CdkSharedModule} from '@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaConfiguracoesComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaConfiguracoesComponent
   ]
})
export class AjudaConfiguracoesModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaConfiguracoesComponent> {
        return this.resolver.resolveComponentFactory(AjudaConfiguracoesComponent);
    }
}
