import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ModeloBlocoComponent} from './modelo-bloco.component';
import {ModeloBlocoStoreModule} from './store/store.module';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import {DocumentoService} from '@cdk/services/documento.service';
import * as fromGuards from './store/guards';
import {MatListModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
    {
        path: '',
        component: ModeloBlocoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/modelo-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModeloBlocoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkModeloGridModule,
        MatListModule,
        MatProgressSpinnerModule,

        ModeloBlocoStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatButtonModule,
    ],
    providers: [
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class ModeloBlocoModule {
}
