import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaDocumentoAvulsoCreateBlocoComponent} from './ajuda-documento-avulso-create-bloco.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaDocumentoAvulsoCreateBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports: [
        AjudaDocumentoAvulsoCreateBlocoComponent
    ]
})
export class AjudaDocumentoAvulsoCreateBlocoModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaDocumentoAvulsoCreateBlocoComponent> {
        return this.resolver.resolveComponentFactory(AjudaDocumentoAvulsoCreateBlocoComponent);
    }
}
