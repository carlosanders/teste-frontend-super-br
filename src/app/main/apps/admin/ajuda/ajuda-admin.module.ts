import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import {AjudaAdminComponent} from './ajuda-admin.component';
import {CdkSharedModule} from '@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaAdminComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [],

    exports: [
        AjudaAdminComponent
    ]
})
export class AjudaAdminModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaAdminComponent> {
        return this.resolver.resolveComponentFactory(AjudaAdminComponent);
    }
}
