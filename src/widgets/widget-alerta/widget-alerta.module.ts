import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { WidgetAlertaComponent } from './widget-alerta.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {LoginService} from 'app/main/auth/login/login.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {TourModule} from "../../app/main/apps/tour/tour.module";

@NgModule({
    declarations: [
        WidgetAlertaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        TourModule,
    ],
    providers: [
        LoginService
    ],
    exports: [
        WidgetAlertaComponent
    ]
})
export class WidgetAlertaModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetAlertaComponent> {
        return this.resolver.resolveComponentFactory(WidgetAlertaComponent);
    }
}
