import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfirmDialogModule, CdkSidebarModule} from '@cdk/components';
import {DadosBasicosCreateComponent} from './dados-basicos-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {DadosBasicosStepsStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkAssuntoFormModule} from '@cdk/components/assunto/cdk-assunto-form/cdk-assunto-form.module';
import {CdkInteressadoFormModule} from '@cdk/components/interessado/cdk-interessado-form/cdk-interessado-form.module';
import {CdkDocumentoFormModule} from '@cdk/components/documento/cdk-documento-form/cdk-documento-form.module';
import {CdkVinculacaoProcessoFormModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-form/cdk-vinculacao-processo-form.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';
import {CdkInteressadoGridModule} from '@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module';
import {CdkVinculacaoProcessoGridModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-grid/cdk-vinculacao-processo-grid.module';
import {AssuntoService} from '@cdk/services/assunto.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {TarefaService} from '@cdk/services/tarefa.service';
import {ConfiguracaoNupService} from '@cdk/services/configuracao-nup.service';
import {CdkProcessoModalClassificacaoRestritaModule} from '@cdk/components/processo/cdk-processo-modal-classificacao-restrita/cdk-processo-modal-classificacao-restrita.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';

const routes: Routes = [
    {
        path: ':generoHandle',
        component: DadosBasicosCreateComponent,
        children: [
            {
                path: 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            },
            {
                path: 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-create/dados-basicos-create-steps';

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
        DadosBasicosStepsStoreModule,
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
        CdkAssuntoGridModule,
        CdkInteressadoGridModule,
        CdkVinculacaoProcessoGridModule,
        MatDialogModule,
        CdkProcessoModalClassificacaoRestritaModule,
        CdkConfirmDialogModule
    ],
    providers: [
        ProcessoService,
        JuntadaService,
        AssuntoService,
        InteressadoService,
        VinculacaoProcessoService,
        TarefaService,
        ConfiguracaoNupService,
        DesentranhamentoService,
        fromGuards.ResolveGuard
    ]
})
export class DadosBasicosCreateModule {
}
