import { ComponentFactory, ComponentFactoryResolver, NgModule } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { StatusBarramentoOficioComponent } from './status-barramento-oficio.component';
import { PipesModule } from '@cdk/pipes/pipes.module';
import {StatusBarramentoService} from "@cdk/services/status-barramento";
import {StatusBarramentoStoreModule} from "./store/store.module";
import {RouterModule, Routes} from "@angular/router";
import * as fromGuards from './store/guards';
import {DirectivesModule} from "@cdk/directives/directives";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
    {
        path: ':documentoAvulsoHandle',
        component: StatusBarramentoOficioComponent,
        canActivate:[fromGuards.ResolveGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        CommonModule,

        StatusBarramentoStoreModule,
        PipesModule,
        DirectivesModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        StatusBarramentoOficioComponent,
    ],
    providers: [
        StatusBarramentoService,
        fromGuards.ResolveGuard
    ]
})

export class StatusBarramentoOficioModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<StatusBarramentoOficioComponent> {
        return this.resolver.resolveComponentFactory(StatusBarramentoOficioComponent);
    }
}
