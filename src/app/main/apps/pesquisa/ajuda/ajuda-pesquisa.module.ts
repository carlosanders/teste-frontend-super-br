import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaPesquisaComponent} from './ajuda-pesquisa.component';
import {CdkSharedModule} from '@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaPesquisaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaPesquisaComponent
   ]
})
export class AjudaPesquisaModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaPesquisaComponent> {
        return this.resolver.resolveComponentFactory(AjudaPesquisaComponent);
    }
}
