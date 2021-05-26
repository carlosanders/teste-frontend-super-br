import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaAssuntosComponent} from './ajuda-assuntos.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaAssuntosComponent
    ],
    imports: [
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        AjudaAssuntosComponent
    ]
})
export class AjudaAssuntosModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaAssuntosComponent> {
        return this.resolver.resolveComponentFactory(AjudaAssuntosComponent);
    }
}
