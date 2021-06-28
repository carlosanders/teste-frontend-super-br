import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {RouterModule, Routes} from '@angular/router';
import {CdkRemessaFormModule} from '@cdk/components/remessa/cdk-remessa-form/cdk-remessa-form.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {modulesConfig} from 'modules/modules-config';
import {RemeterProcessosBlocoComponent} from './remeter-processos-bloco.component';
import {RemessaBlocoStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: RemeterProcessosBlocoComponent,
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ],
    }
];


const path = 'app/main/apps/tarefas/encaminhamento-bloco/remeter-processos-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RemeterProcessosBlocoComponent
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
        MatListModule,

        CdkRemessaFormModule,

        RemessaBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
    ],
    providers: [
        TramitacaoService
    ]
})
export class RemeterProcessosBlocoModule {
}
