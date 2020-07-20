import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {DadosBasicosCreateComponent} from './dados-basicos-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {DadosBasicosStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkAssuntoFormModule} from '@cdk/components/assunto/cdk-assunto-form/cdk-assunto-form.module';
import {CdkInteressadoFormModule} from '@cdk/components/interessado/cdk-interessado-form/cdk-interessado-form.module';
import {CdkDocumentoFormModule} from '@cdk/components/documento/cdk-documento-form/cdk-documento-form.module';
import {CdkVinculacaoProcessoFormModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-form/cdk-vinculacao-processo-form.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {AssuntoEditModule} from '../assuntos/assunto-edit/assunto-edit.module';
import {InteressadoEditModule} from '../interessados/interessado-edit/interessado-edit.module';
import {VinculacaoProcessoEditModule} from '../vinculacoes-processos/vinculacao-processo-edit/vinculacao-processo-edit.module';
import {ProcessoTarefaEditModule} from '../tarefas/tarefa-edit/processo-tarefa-edit.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';

const routes: Routes = [
    {
        path: '',
        component: DadosBasicosCreateComponent,
        children: [
            {
                path: 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-create/dados-basicos-create';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DadosBasicosCreateComponent
    ],
    imports: [

        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkProcessoFormModule,

        DadosBasicosStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        CdkAssuntoFormModule,
        CdkInteressadoFormModule,
        CdkDocumentoFormModule,
        CdkVinculacaoProcessoFormModule,
        CdkTarefaFormModule,
        CdkComponenteDigitalCardListModule,
        CdkJuntadaGridModule,
        AssuntoEditModule,
        InteressadoEditModule,
        VinculacaoProcessoEditModule,
        ProcessoTarefaEditModule
    ],
    providers: [
        ProcessoService,
        JuntadaService,
        fromGuards.ResolveGuard
    ]
})
export class DadosBasicosCreateModule {
}
