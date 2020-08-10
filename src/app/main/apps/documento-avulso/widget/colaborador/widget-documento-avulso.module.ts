import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { WidgetDocumentoAvulsoComponent } from './widget-documento-avulso.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {LoginService} from 'app/main/auth/login/login.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';

@NgModule({
    declarations: [
        WidgetDocumentoAvulsoComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
    providers: [
        DocumentoAvulsoService,
        LoginService
    ],
    exports: [
        WidgetDocumentoAvulsoComponent
    ]
})
export class WidgetDocumentoAvulsoColaboradorModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetDocumentoAvulsoComponent> {
        return this.resolver.resolveComponentFactory(WidgetDocumentoAvulsoComponent);
    }
}