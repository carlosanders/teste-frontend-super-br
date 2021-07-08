import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaEnviaArquivistaComponent} from './ajuda-envia-arquivista.component';
import {CdkSharedModule} from '@cdk/shared.module';

import {AjudaTransicoesModule} from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';


@NgModule({
    declarations: [
        AjudaEnviaArquivistaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaTransicoesModule,


    ],
    providers: [
    ],

    exports: [
        AjudaEnviaArquivistaComponent
   ]
})
export class AjudaEnviaArquivistaModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaEnviaArquivistaComponent> {
        return this.resolver.resolveComponentFactory(AjudaEnviaArquivistaComponent);
    }
}
