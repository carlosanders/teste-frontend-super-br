import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { WidgetPessoaComponent } from './widget-pessoa.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {LoginService} from 'app/main/auth/login/login.service';
import {PessoaService} from '@cdk/services/pessoa.service';

@NgModule({
    declarations: [
        WidgetPessoaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        CdkWidgetModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
    providers: [
        PessoaService,
        LoginService
    ],
    exports: [
        WidgetPessoaComponent
    ]
})
export class WidgetPessoaModule {

    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<WidgetPessoaComponent> {
        return this.resolver.resolveComponentFactory(WidgetPessoaComponent);
    }
}
