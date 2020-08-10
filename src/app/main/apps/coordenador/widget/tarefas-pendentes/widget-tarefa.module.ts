import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { WidgetTarefaComponent } from './widget-tarefa.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        WidgetTarefaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
    providers: [
        TarefaService,
        LoginService
    ],
    exports: [
        WidgetTarefaComponent
    ]
})
export class WidgetTarefaCoordenadorModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetTarefaComponent> {
        return this.resolver.resolveComponentFactory(WidgetTarefaComponent);
    }
}
