import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { PainelComponent } from 'app/main/apps/painel/painel.component';

import { TarefaService } from '@cdk/services/tarefa.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from '../../auth/login/login.service';
import {CdkHistoricoTimelineModule} from '@cdk/components/historico/cdk-historico-timeline/cdk-historico-timeline.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

const routes: Routes = [
    {
        path     : '**',
        component: PainelComponent
    }
];

@NgModule({
    declarations: [
        PainelComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatProgressSpinnerModule,

        CdkHistoricoTimelineModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        TarefaService,
        DocumentoAvulsoService,
        TramitacaoService,
        HistoricoService,
        LoginService
    ]
})
export class PainelModule
{
}

