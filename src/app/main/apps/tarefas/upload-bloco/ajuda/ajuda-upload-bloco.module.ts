import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaUploadBlocoComponent} from './ajuda-upload-bloco.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaUploadBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaUploadBlocoComponent
    ]
})
export class AjudaUploadBlocoModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaUploadBlocoComponent> {
        return this.resolver.resolveComponentFactory(AjudaUploadBlocoComponent);
    }

}
