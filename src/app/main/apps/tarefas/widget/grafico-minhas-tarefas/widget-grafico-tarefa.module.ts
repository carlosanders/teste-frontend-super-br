import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetGraficoTarefaComponent} from './widget-grafico-tarefa.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
    declarations: [
        WidgetGraficoTarefaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        RouterModule,
        NgApexchartsModule
    ],
    providers: [
        TarefaService,
        LoginService
    ],
    exports: [
        WidgetGraficoTarefaComponent
    ]
})
export class WidgetGraficoTarefaModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetGraficoTarefaComponent> {
        return this.resolver.resolveComponentFactory(WidgetGraficoTarefaComponent);
    }
}
