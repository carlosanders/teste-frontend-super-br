import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationInterface } from '../notification.interface';
import { RelatorioComponent } from './relatorio.component';

@NgModule({
    declarations: [
        RelatorioComponent
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
        RelatorioComponent
    ]
})
export class RelatorioModule implements NotificationInterface {

    constructor(private resolver: ComponentFactoryResolver) {
    }

    supports(notification): boolean {
        return !!notification.tipoNotificacao && notification.tipoNotificacao.nome === 'relatorio';
    }

    public resolveComponentFactory(): ComponentFactory<RelatorioComponent> {
        return this.resolver.resolveComponentFactory(RelatorioComponent);
    }
}
