import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';

import { WidgetTramitacaoComponent } from './widget-tramitacao.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@cdk/angular/material';
import {LoginService} from 'app/main/auth/login/login.service';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {MatCardModule} from '@angular/material/card';

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
