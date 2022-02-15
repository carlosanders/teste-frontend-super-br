import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetDocumentoAvulsoComponent} from './widget-documento-avulso.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginService} from 'app/main/auth/login/login.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";


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
        MatCardModule,
        RouterModule,
        MatButtonModule,
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
