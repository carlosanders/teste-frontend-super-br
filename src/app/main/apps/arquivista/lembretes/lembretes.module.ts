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

const routes: Routes = [
    {
        path       : '',
        component: LembretesComponent,
    }
];
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
        LembreteStoreModule
    ],
    providers: [
        LembreteService,
        LoginService,
        ProcessoService
    ],
})
export class LembretesModule {
}