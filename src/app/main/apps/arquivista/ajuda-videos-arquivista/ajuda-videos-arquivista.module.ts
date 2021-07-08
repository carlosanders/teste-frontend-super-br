import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaVideosArquivistaComponent} from './ajuda-videos-arquivista.component';
import {CdkSharedModule} from '@cdk/shared.module';

import {AjudaTransicoesModule} from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';


@NgModule({
    declarations: [
        AjudaVideosArquivistaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaTransicoesModule,


    ],
    providers: [
    ],

    exports: [
        AjudaVideosArquivistaComponent
   ]
})
export class AjudaVideosArquivistaModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaVideosArquivistaComponent> {
        return this.resolver.resolveComponentFactory(AjudaVideosArquivistaComponent);
    }
}
