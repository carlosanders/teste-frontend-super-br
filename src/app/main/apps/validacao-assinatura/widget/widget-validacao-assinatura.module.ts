import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetValidacaoAssinaturaComponent} from './widget-validacao-assinatura.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "../../../../../@cdk/angular/material";

@NgModule({
    declarations: [
        WidgetValidacaoAssinaturaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
    ],
    exports: [
        WidgetValidacaoAssinaturaComponent
    ]
})
export class WidgetValidacaoAssinaturaModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetValidacaoAssinaturaComponent> {
        return this.resolver.resolveComponentFactory(WidgetValidacaoAssinaturaComponent);
    }
}
