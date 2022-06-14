import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetCompartilhadasComponent} from './widget-compartilhadas.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        WidgetCompartilhadasComponent
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
    ],
    providers: [
        TarefaService,
        LoginService
    ],
    exports: [
        WidgetCompartilhadasComponent
    ]
})
export class WidgetCompartilhadasModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetCompartilhadasComponent> {
        return this.resolver.resolveComponentFactory(WidgetCompartilhadasComponent);
    }
}
