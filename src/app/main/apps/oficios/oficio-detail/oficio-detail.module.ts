import { Injector, NgModule, ɵrenderComponent as renderComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

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
import { DynamicService } from '../../../../../modules/dynamic.service';

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
                path: 'modelo',
                loadChildren: () => import('app/main/apps/modelo/modelo.module').then(m => m.ModeloModule),
            },
            {
                path: 'oficio',
                loadChildren: () => import('app/main/apps/documento-avulso/documento-avulso-create/documento-avulso-create.module').then(m => m.DocumentoAvulsoCreateModule),
            }
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

        FuseSharedModule,
        FuseSidebarModule
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
