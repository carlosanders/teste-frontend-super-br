import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {CdkLembreteGridModule} from '@cdk/components/lembrete/cdk-lembrete-grid/cdk-lembrete-grid.module';
import {CdkLembreteFormModule} from '@cdk/components/lembrete/cdk-lembrete-form/cdk-lembrete-form.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {LembreteStoreModule} from './store/store.module';
import {LembretesComponent} from './lembretes.component';

import {LoginService} from '../../../auth/login/login.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {modulesConfig} from 'modules/modules-config';
import {DirectivesModule} from '@cdk/directives/directives';
import {CdkProcessoArquivistaFormModule} from '@cdk/components/processo/cdk-processo-arquivista-form/cdk-processo-arquivista-form.module';

const routes: Routes = [
    {
        path       : '',
        component: LembretesComponent,
    }
];

const path = 'app/main/apps/arquivista/lembretes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        LembretesComponent
    ]
    ,
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CdkLembreteGridModule,
        CdkLembreteFormModule,
        LembreteStoreModule,
        DirectivesModule,
        CdkProcessoArquivistaFormModule
    ],
    providers: [
        LembreteService,
        ProcessoService
    ],
})
export class LembretesModule {
}
