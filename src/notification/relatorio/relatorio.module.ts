import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@cdk/angular/material';
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
        return !!notification.tipoNotificacao && notification.tipoNotificacao.nome === 'RELATORIO';
    }

    public resolveComponentFactory(): ComponentFactory<RelatorioComponent> {
        return this.resolver.resolveComponentFactory(RelatorioComponent);
    }
}
