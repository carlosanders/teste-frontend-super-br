import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSortModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {TramitacaoViewComponent} from './tramitacao-view.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {TramitacaoViewStoreModule} from 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-view/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-view/store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: ':tramitacaoHandle',
        component: TramitacaoViewComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TramitacaoViewComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        TramitacaoViewStoreModule,
        MatTooltipModule
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TramitacaoViewComponent
    ]
})
export class TramitacaoViewModule {
}
