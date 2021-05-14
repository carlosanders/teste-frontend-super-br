import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaModeloBlocoComponent} from './ajuda-modelo-bloco.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaModeloBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaModeloBlocoComponent
    ]
})
export class AjudaModeloBlocoModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaModeloBlocoComponent> {
        return this.resolver.resolveComponentFactory(AjudaModeloBlocoComponent);
    }
}
