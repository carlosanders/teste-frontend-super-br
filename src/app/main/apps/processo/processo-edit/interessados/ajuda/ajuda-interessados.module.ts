import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';


import {AjudaInteressadosComponent} from './ajuda-interessados.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaInteressadosComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,

    ],
    providers: [
    ],
    exports: [
        AjudaInteressadosComponent
    ]
})
export class AjudaInteressadosModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaInteressadosComponent> {
        return this.resolver.resolveComponentFactory(AjudaInteressadosComponent);
    }
}
