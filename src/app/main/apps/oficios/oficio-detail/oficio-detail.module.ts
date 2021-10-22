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

import {OficioDetailComponent} from './oficio-detail.component';
import {CommonModule} from '@angular/common';

import * as fromGuards from './store/guards';

import {OficioDetailStoreModule} from './store/store.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {MatBadgeModule} from '@angular/material/badge';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':documentoAvulsoHandle',
        component: OficioDetailComponent,
        children: [
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule)
            },
            {
                path: 'responder/:chaveAcessoHandle',
                loadChildren: () => import('./responder/responder.module').then(m => m.ResponderModule)
            },
            {
                path: 'complementar/:chaveAcessoHandle',
                loadChildren: () => import('./complementar/complementar.module').then(m => m.ComplementarModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/oficios/oficio-detail';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        OficioDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        OficioDetailStoreModule,

        PipesModule,

        TranslateModule,

        CdkVinculacaoEtiquetaChipsModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,
        CdkUploadModule,
        CdkAtividadeFormModule,
        MatBadgeModule
    ],
    exports: [
        OficioDetailComponent
    ],
    providers: [
        TarefaService,
        VinculacaoEtiquetaService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class OficioDetailModule {
}
