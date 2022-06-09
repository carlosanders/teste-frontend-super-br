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
import {ProcessoSolicitarDossiesComponent} from './processo-solicitar-dossies.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {RouterModule, Routes} from '@angular/router';
import {ProcessoSolicitarDossiesStoreModule} from 'app/main/apps/processo/processo-solicitar-dossies/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-solicitar-dossies/store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from "@angular/material/tooltip";
import {InteressadoService} from "../../../../../@cdk/services/interessado.service";
import {CdkInteressadoGridModule} from "../../../../../@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module";
import {MatStepperModule} from "@angular/material/stepper";
import {DossieService} from "../../../../../@cdk/services/dossie.service";
import {TipoDossieService} from "../../../../../@cdk/services/tipo-dossie.service";
import {CdkSidebarModule} from "../../../../../@cdk/components";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CdkTipoDossieGridModule} from "../../../../../@cdk/components/tipo-dossie/cdk-tipo-dossie-grid/cdk-tipo-dossie-grid.module";
import {MatListModule} from "@angular/material/list";

const routes: Routes = [
    {
        path: '',
        component: ProcessoSolicitarDossiesComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-solicitar-dossies';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoSolicitarDossiesComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        ProcessoSolicitarDossiesStoreModule,
        MatTooltipModule,
        CdkInteressadoGridModule,
        MatStepperModule,
        CdkSidebarModule,
        MatFormFieldModule,
        CdkTipoDossieGridModule
    ],
    providers: [
        ProcessoService,
        InteressadoService,
        DossieService,
        TipoDossieService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ProcessoSolicitarDossiesComponent
    ]
})
export class ProcessoSolicitarDossiesModule {
}
