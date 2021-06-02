import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@cdk/angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationInterface } from '../notification.interface';
import { ProcessoComponent } from './processo.component';

@NgModule({
    declarations: [
        ProcessoComponent
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
        ProcessoComponent
    ]
})
export class ProcessoModule implements NotificationInterface {

    constructor(private resolver: ComponentFactoryResolver) { }

    supports(notification): boolean {
        return !!notification.tipoNotificacao && notification.tipoNotificacao.nome === 'PROCESSO';
    }

    public resolveComponentFactory(): ComponentFactory<ProcessoComponent> {
        return this.resolver.resolveComponentFactory(ProcessoComponent);
    }
}
