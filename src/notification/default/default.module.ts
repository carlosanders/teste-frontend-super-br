import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatExpansionModule } from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkWidgetModule } from '@cdk/components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@cdk/angular/material';
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
