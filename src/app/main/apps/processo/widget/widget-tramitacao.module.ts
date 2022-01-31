import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetTramitacaoComponent} from './widget-tramitacao.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginService} from 'app/main/auth/login/login.service';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        WidgetTramitacaoComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        RouterModule,
        MatButtonModule,
    ],
    providers: [
        TramitacaoService,
        LoginService
    ],
    exports: [
        WidgetTramitacaoComponent
    ]
})
export class WidgetTramitacaoModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetTramitacaoComponent> {
        return this.resolver.resolveComponentFactory(WidgetTramitacaoComponent);
    }
}
