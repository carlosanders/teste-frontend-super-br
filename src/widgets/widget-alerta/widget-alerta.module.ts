import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import { WidgetAlertaComponent } from './widget-alerta.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {LoginService} from 'app/main/auth/login/login.service';
import {MatCardModule} from '@angular/material/card';
import {TourModule} from '../../ajuda/tour/tour.module';
import {AvisoService} from '@cdk/services/aviso.service';
import {
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTooltipModule,
} from '@cdk/angular/material';

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
        MatListModule,
        MatTooltipModule,
    ],
    providers: [
        LoginService,
        AvisoService
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
