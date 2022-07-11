import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';

import {WidgetAfastamentosComponent} from './widget-afastamentos.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginService} from 'app/main/auth/login/login.service';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from "@angular/router";
import {AfastamentoService} from "../../../../../../@cdk/services/afastamento.service";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    declarations: [
        WidgetAfastamentosComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        RouterModule,
    ],
    providers: [
        AfastamentoService,
        LoginService
    ],
    exports: [
        WidgetAfastamentosComponent
    ]
})
export class WidgetAfastamentosModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetAfastamentosComponent> {
        return this.resolver.resolveComponentFactory(WidgetAfastamentosComponent);
    }
}
