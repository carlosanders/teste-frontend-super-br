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
import {ProcessoEtiquetaViewComponent} from './processo-etiqueta-view.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {RouterModule, Routes} from '@angular/router';
import {ProcessoEtiquetaViewStoreModule} from 'app/main/apps/processo/processo-etiqueta-view/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-etiqueta-view/store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
    {
        path: '',
        component: ProcessoEtiquetaViewComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-etiqueta-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoEtiquetaViewComponent
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
        ProcessoEtiquetaViewStoreModule,
        MatTooltipModule
    ],
    providers: [
        ProcessoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ProcessoEtiquetaViewComponent
    ]
})
export class ProcessoEtiquetaViewModule {
}
