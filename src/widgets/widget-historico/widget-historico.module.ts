import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { WidgetHistoricoComponent } from './widget-historico.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {LoginService} from 'app/main/auth/login/login.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoTimelineModule} from '@cdk/components/historico/cdk-historico-timeline/cdk-historico-timeline.module';
import {TourModule} from "../../ajuda/tour/tour.module";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [
        WidgetHistoricoComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        CdkHistoricoTimelineModule,
        TourModule,
        MatTooltipModule,
    ],
    providers: [
        LoginService,
        HistoricoService,
    ],
    exports: [
        WidgetHistoricoComponent
    ]
})
export class WidgetHistoricoModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetHistoricoComponent> {
        return this.resolver.resolveComponentFactory(WidgetHistoricoComponent);
    }
}
