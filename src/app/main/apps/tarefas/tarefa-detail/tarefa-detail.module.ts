import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {TarefaDetailComponent} from './tarefa-detail.component';
import {CommonModule} from '@angular/common';

import * as fromGuards from './store/guards';

import {TarefaDetailStoreModule} from './store/store.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {CdkVinculacaoEtiquetaChipsModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {PipesModule} from '@cdk/pipes/pipes.module';

const routes: Routes = [
    {
        path: ':tarefaHandle',
        component: TarefaDetailComponent,
        children: [
            {
                path: 'editar',
                loadChildren: './tarefa-edit/tarefa-edit.module#TarefaEditModule'
            },
            {
                path: 'atividades',
                loadChildren: './atividades/atividades.module#AtividadesModule'
            },
            {
                path: 'compartilhamentos',
                loadChildren: './compartilhamentos/compartilhamentos.module#CompartilhamentosModule'
            },
            {
                path: 'processo',
                loadChildren: './processo/tarefa-processo.module#TarefaProcessoModule'
            },
            {
                path: 'modelo',
                loadChildren: 'app/main/apps/modelo/modelo.module#ModeloModule',
            },
            {
                path: 'oficio',
                loadChildren: 'app/main/apps/documento-avulso/documento-avulso-create/documento-avulso-create.module#DocumentoAvulsoCreateModule',
            },
            {
                path: 'encaminhamento',
                loadChildren: './encaminhamento/encaminhamento.module#EncaminhamentoModule',
            },
            {
                path: '**',
                redirectTo: 'editar'
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TarefaDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        TarefaDetailStoreModule,

        PipesModule,

        TranslateModule,

        CdkVinculacaoEtiquetaChipsModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [
        TarefaService,
        VinculacaoEtiquetaService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class TarefaDetailModule {
}
