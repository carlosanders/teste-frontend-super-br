import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaRelatoriosComponent} from './ajuda-relatorios.component';
import {CdkSharedModule} from '@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaRelatoriosComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaRelatoriosComponent
   ]
})
export class AjudaRelatoriosModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaRelatoriosComponent> {
        return this.resolver.resolveComponentFactory(AjudaRelatoriosComponent);
    }
}
