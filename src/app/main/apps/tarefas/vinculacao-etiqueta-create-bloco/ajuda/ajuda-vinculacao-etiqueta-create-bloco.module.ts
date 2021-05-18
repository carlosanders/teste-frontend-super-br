import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaVinculacaoEtiquetaCreateBlocoComponent} from './ajuda-vinculacao-etiqueta-create-bloco.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaVinculacaoEtiquetaCreateBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaVinculacaoEtiquetaCreateBlocoComponent
    ]
})
export class AjudaVinculacaoEtiquetaCreateBlocoModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaVinculacaoEtiquetaCreateBlocoComponent> {
        return this.resolver.resolveComponentFactory(AjudaVinculacaoEtiquetaCreateBlocoComponent);
    }
}
