import { Injector, NgModule, ɵrenderComponent as renderComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import { OficioDetailComponent } from './oficio-detail.component';
import { CommonModule } from '@angular/common';

import * as fromGuards from './store/guards';

import { OficioDetailStoreModule } from './store/store.module';
import { TarefaService } from '@cdk/services/tarefa.service';
import { CdkVinculacaoEtiquetaChipsModule } from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import { VinculacaoEtiquetaService } from '@cdk/services/vinculacao-etiqueta.service';
import { DocumentoService } from '@cdk/services/documento.service';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { LoginService } from '../../../auth/login/login.service';
import {CdkComponenteDigitalCardListModule} from '../../../../../@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '../../../../../@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '../../../../../@cdk/components/upload/cdk-upload.module';
import {CdkAtividadeFormModule} from '../../../../../@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {ResponderComplementarModule} from './reponder-complementar/responder-complementar.module';
import {MatBadge, MatBadgeModule} from '@angular/material/badge';
const routes: Routes = [
    {
        path: ':documentoAvulsoHandle',
        component: OficioDetailComponent,
        children: [
            {
                path: 'atividades',
                loadChildren: () => import('./atividades/atividades.module').then(m => m.AtividadesModule)
            },
            {
                path: 'processo',
                loadChildren: () => import('app/main/apps/processo/processo.module').then(m => m.ProcessoModule)
            },
            {
                path: 'responder-complementar',
                loadChildren: () => import('./reponder-complementar/responder-complementar.module').then(m => m.ResponderComplementarModule)
            },
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

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
        MatBadgeModule,
        ResponderComplementarModule
    ],
    exports: [
        OficioDetailComponent
    ],
    providers: [
        TarefaService,
        VinculacaoEtiquetaService,
        LoginService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class OficioDetailModule {
}
