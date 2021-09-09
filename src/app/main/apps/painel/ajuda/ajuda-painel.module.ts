import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaPainelComponent} from './ajuda-painel.component';
import {CdkSharedModule} from '@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaPainelComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [],

    exports: [
        AjudaPainelComponent
    ]
})
export class AjudaPainelModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaPainelComponent> {
        return this.resolver.resolveComponentFactory(AjudaPainelComponent);
    }
}
