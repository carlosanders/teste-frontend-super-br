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
import {ProcessoRelatorioViewComponent} from './processo-relatorio-view.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {RouterModule, Routes} from '@angular/router';
import {ProcessoRelatorioViewStoreModule} from 'app/main/apps/processo/processo-relatorio-view/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-relatorio-view/store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from "@angular/material/tooltip";
import {CdkImprimirRelatorioFormModule} from "../../../../../@cdk/components/imprimir-relatorio/cdk-imprimir-relatorio-form/cdk-imprimir-relatorio-form.module";

const routes: Routes = [
    {
        path: '',
        component: ProcessoRelatorioViewComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-relatorio-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoRelatorioViewComponent
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
        ProcessoRelatorioViewStoreModule,
        MatTooltipModule,
        CdkImprimirRelatorioFormModule
    ],
    providers: [
        ProcessoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ProcessoRelatorioViewComponent
    ]
})
export class ProcessoRelatorioViewModule {
}
