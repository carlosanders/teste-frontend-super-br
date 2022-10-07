import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetGraficoTaxaSucessoJudicialComponent} from './widget-grafico-taxa-sucesso-judicial.component';
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
        WidgetGraficoTaxaSucessoJudicialComponent
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
        WidgetGraficoTaxaSucessoJudicialComponent
    ]
})
export class WidgetGraficoTaxaSucessoJudicialModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetGraficoTaxaSucessoJudicialComponent> {
        return this.resolver.resolveComponentFactory(WidgetGraficoTaxaSucessoJudicialComponent);
    }
}
