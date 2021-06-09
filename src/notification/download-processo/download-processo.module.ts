import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@cdk/angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationInterface } from '../notification.interface';
import { DownloadProcessoComponent } from './download-processo.component';

@NgModule({
    declarations: [
        DownloadProcessoComponent
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
        DownloadProcessoComponent
    ]
})
export class DownloadProcessoModule implements NotificationInterface {

    constructor(private resolver: ComponentFactoryResolver) { }

    supports(notification): boolean {
        return !!notification.tipoNotificacao && notification.tipoNotificacao.nome === 'DOWNLOAD PROCESSO';
    }

    public resolveComponentFactory(): ComponentFactory<DownloadProcessoComponent> {
        return this.resolver.resolveComponentFactory(DownloadProcessoComponent);
    }
}
