import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaVisibilidadesComponent} from './ajuda-visibilidades.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaVisibilidadesComponent
    ],
    imports: [
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        AjudaVisibilidadesComponent
    ]
})
export class AjudaVisibilidadesModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaVisibilidadesComponent> {
        return this.resolver.resolveComponentFactory(AjudaVisibilidadesComponent);
    }
}
