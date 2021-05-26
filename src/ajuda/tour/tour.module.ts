import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {ShepherdComponent} from './tour.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        ShepherdComponent
    ],
    imports: [
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        ShepherdComponent
    ]
})
export class TourModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<ShepherdComponent> {
        return this.resolver.resolveComponentFactory(ShepherdComponent);
    }
}
