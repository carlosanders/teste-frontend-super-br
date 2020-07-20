import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkWidgetModule} from '@cdk/components/widget/widget.module';

import {PainelComponent} from './painel.component';

import {TarefaService} from '@cdk/services/tarefa.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from '../../auth/login/login.service';
import {CdkHistoricoTimelineModule} from '@cdk/components/historico/cdk-historico-timeline/cdk-historico-timeline.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '**',
        component: PainelComponent
    }
];

const path = 'app/main/apps/painel';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        PainelComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatProgressSpinnerModule,

        CdkHistoricoTimelineModule,

        CdkSharedModule,
        CdkWidgetModule
    ],
    providers: [
        TarefaService,
        DocumentoAvulsoService,
        TramitacaoService,
        HistoricoService,
        LoginService
    ]
})
export class PainelModule {
}

