import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotificationInterface } from '../notification.interface';
import { DefaultComponent } from './default.component';

@NgModule({
    declarations: [
        DefaultComponent
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
        DefaultComponent
    ]
})
export class DefaultModule implements NotificationInterface {

    constructor(private resolver: ComponentFactoryResolver) {
    }

    supports(notification): boolean {
        return true;
    }

    public resolveComponentFactory(): ComponentFactory<DefaultComponent> {
        return this.resolver.resolveComponentFactory(DefaultComponent);
    }
}
