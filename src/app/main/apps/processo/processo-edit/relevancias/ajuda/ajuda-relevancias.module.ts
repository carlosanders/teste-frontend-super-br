import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AjudaRelevanciasComponent } from './ajuda-relevancias.component';
import { CdkSharedModule } from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaRelevanciasComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
    ],
    providers: [
    ],

    exports: [
        AjudaRelevanciasComponent
   ]
})
export class AjudaRelevanciasModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaRelevanciasComponent> {
        return this.resolver.resolveComponentFactory(AjudaRelevanciasComponent);
    }
}
