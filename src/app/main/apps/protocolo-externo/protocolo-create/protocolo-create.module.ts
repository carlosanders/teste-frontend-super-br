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
    MatProgressSpinnerModule, MatTooltipModule, MatDialogModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProtocoloCreateComponent} from './protocolo-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {ProtocoloCreateStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkVisibilidadePluginModule} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.module';
import {MatStepperModule} from "@angular/material/stepper";
import {CdkProcessoFormModule} from "../../../../../@cdk/components/processo/cdk-processo-form/cdk-processo-form.module";
import {CdkComponenteDigitalDocumentoAvulsoCardListModule} from '../../../../../@cdk/components/documento-avulso/cdk-componente-digital-documento-avulso-card-list/cdk-componente-digital-documento-avulso-card-list.module';
import {CdkDocumentoCardListModule} from '../../../../../@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: ProtocoloCreateComponent
    },
    {
        path: ':processoHandle',
        component: ProtocoloCreateComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ProtocoloCreateComponent
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

        ProtocoloCreateStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        CdkProcessoFormModule,
        CdkComponenteDigitalDocumentoAvulsoCardListModule,
        CdkDocumentoCardListModule,
    ],
    providers: [
        ProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class ProtocoloCreateModule {
}
