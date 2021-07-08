import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaDefinicaoArquivistaComponent} from './ajuda-definicao-arquivista.component';
import {CdkSharedModule} from '@cdk/shared.module';

import {AjudaTransicoesModule} from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';


@NgModule({
    declarations: [
        AjudaDefinicaoArquivistaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaTransicoesModule,


    ],
    providers: [
    ],

    exports: [
        AjudaDefinicaoArquivistaComponent
   ]
})
export class AjudaDefinicaoArquivistaModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaDefinicaoArquivistaComponent> {
        return this.resolver.resolveComponentFactory(AjudaDefinicaoArquivistaComponent);
    }
}
