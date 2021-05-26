import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';


import {AjudaJuntadasComponent} from './ajuda-juntadas.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaJuntadasComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,

    ],
    providers: [
    ],
    exports: [
        AjudaJuntadasComponent
    ]
})
export class AjudaJuntadasModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaJuntadasComponent> {
        return this.resolver.resolveComponentFactory(AjudaJuntadasComponent);
    }
}
