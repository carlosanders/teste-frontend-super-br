import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {AjudaOficiosComponent} from './ajuda-oficios.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {AjudaUploadBlocoModule} from '../../tarefas/upload-bloco/ajuda/ajuda-upload-bloco.module';

@NgModule({
    declarations: [
        AjudaOficiosComponent
    ],
    imports: [
        CdkSharedModule,
        AjudaUploadBlocoModule,
    ],
    providers: [
    ],
    exports: [
        AjudaOficiosComponent
    ]
})
export class AjudaOficiosModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaOficiosComponent> {
        return this.resolver.resolveComponentFactory(AjudaOficiosComponent);
    }
}
