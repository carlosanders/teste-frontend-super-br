import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetAcompanhamentoComponent} from './widget-acompanhamento.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginService} from 'app/main/auth/login/login.service';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        WidgetAcompanhamentoComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        RouterModule,
    ],
    providers: [
        AcompanhamentoService,
        LoginService
    ],
    exports: [
        WidgetAcompanhamentoComponent
    ]
})
export class WidgetAcompanhamentoModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetAcompanhamentoComponent> {
        return this.resolver.resolveComponentFactory(WidgetAcompanhamentoComponent);
    }
}
