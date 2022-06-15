import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';
import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {VisualizarProcessoComponent} from './visualizar-processo.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';
import {ProcessoStoreModule} from '../../processo/store/store.module';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {ProcessoService} from '@cdk/services/processo.service';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: VisualizarProcessoComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'visualizar',
                loadChildren: () => import('app/main/apps/processo/processo-view/processo-view.module').then(m => m.ProcessoViewModule)
            }
        ]
    }
];

const path = 'app/main/apps/documento/visualizar-processo';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VisualizarProcessoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        CdkSharedModule,

        ProcessoStoreModule,

        MatTooltipModule,
        MatProgressSpinnerModule

    ],
    providers: [
        AcompanhamentoService,
        fromGuards.ResolveGuard,
        ProcessoService
    ],
    exports: [
        VisualizarProcessoComponent
    ]
})
export class VisualizarProcessoModule {
}
