import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProtocoloExternoDetailComponent} from './protocolo-externo-detail.component';
import {CommonModule} from '@angular/common';

import * as fromGuards from './store/guards';

import {ProcessoDetailStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: ProtocoloExternoDetailComponent,
        children: [
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule)
            },
            {
                path: 'complementar',
                loadChildren: () => import('./complementar/complementar.module').then(m => m.ComplementarModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/protocolo-externo/protocolo-externo-detail';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProtocoloExternoDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        ProcessoDetailStoreModule,
        PipesModule,
        TranslateModule,
        CdkVinculacaoEtiquetaChipsModule,
        CdkSharedModule,
        CdkSidebarModule
    ],
    providers: [
        ProcessoService,
        VinculacaoEtiquetaService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class ProtocoloExternoDetailModule {
}
