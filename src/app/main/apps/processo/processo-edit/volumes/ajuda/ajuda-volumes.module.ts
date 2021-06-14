import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaVolumesComponent} from './ajuda-volumes.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaVolumesComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
    ],
    providers: [
    ],

    exports: [
        AjudaVolumesComponent
   ]
})
export class AjudaVolumesModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaVolumesComponent> {
        return this.resolver.resolveComponentFactory(AjudaVolumesComponent);
    }
}
