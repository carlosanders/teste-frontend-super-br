import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@cdk/angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationInterface } from '../notification.interface';
import { TarefaComponent } from './tarefa.component';

@NgModule({
    declarations: [
        TarefaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
    ],
    exports: [
        TarefaComponent
    ]
})
export class TarefaModule implements NotificationInterface {

    constructor(private resolver: ComponentFactoryResolver) { }

    supports(notification): boolean {
        return !!notification.tipoNotificacao && notification.tipoNotificacao.nome === 'TAREFA';
    }

    public resolveComponentFactory(): ComponentFactory<TarefaComponent> {
        return this.resolver.resolveComponentFactory(TarefaComponent);
    }
}
