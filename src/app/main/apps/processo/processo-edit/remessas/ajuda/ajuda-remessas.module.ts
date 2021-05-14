import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaRemessasComponent} from './ajuda-remessas.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaRemessasComponent
    ],
    imports: [
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        AjudaRemessasComponent
    ]
})
export class AjudaRemessasModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaRemessasComponent> {
        return this.resolver.resolveComponentFactory(AjudaRemessasComponent);
    }
}
