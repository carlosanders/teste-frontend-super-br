import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaArquivistaComponent} from './ajuda-arquivista.component';
import {CdkSharedModule} from '@cdk/shared.module';

import {AjudaTransicoesModule} from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';


@NgModule({
    declarations: [
        AjudaArquivistaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaTransicoesModule,


    ],
    providers: [
    ],

    exports: [
        AjudaArquivistaComponent
   ]
})
export class AjudaArquivistaModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaArquivistaComponent> {
        return this.resolver.resolveComponentFactory(AjudaArquivistaComponent);
    }
}
