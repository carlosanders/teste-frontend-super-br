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
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {ProtocoloExistenteComponent} from './protocolo-existente.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {ProtocoloExistenteCreateStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkVisibilidadePluginModule} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.module';
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {CdkComponenteDigitalDocumentoAvulsoCardListModule} from '@cdk/components/documento-avulso/cdk-componente-digital-documento-avulso-card-list/cdk-componente-digital-documento-avulso-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {EstadoService} from '@cdk/services/estado.service';
import {modulesConfig} from 'modules/modules-config';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkProtocoloExternoFormModule} from '@cdk/components/protocolo-externo/cdk-protocolo-externo-form/cdk-protocolo-externo-form.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {JuntadaService} from "../../../../../@cdk/services/juntada.service";

const routes: Routes = [
    {
        path: ':processoHandle',
        component: ProtocoloExistenteComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: ':processoHandle/anexar',
        component: ProtocoloExistenteComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/protocolo-externo/protocolo-existente';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProtocoloExistenteComponent
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
        MatDialogModule,
        CdkTarefaFormModule,
        CdkVisibilidadePluginModule,
        ProtocoloExistenteCreateStoreModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        CdkProcessoFormModule,
        CdkComponenteDigitalDocumentoAvulsoCardListModule,
        CdkDocumentoCardListModule,
        CdkProtocoloExternoFormModule,
        CdkComponenteDigitalCardListModule,
    ],
    providers: [
        ProcessoService,
        EstadoService,
        fromGuards.ResolveGuard,
        AssinaturaService,
        JuntadaService,
    ]
})
export class ProtocoloExistenteModule {
}
