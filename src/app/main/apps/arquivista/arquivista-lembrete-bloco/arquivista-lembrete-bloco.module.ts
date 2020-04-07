import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaLembreteBlocoComponent} from './arquivista-lembrete-bloco.component';
import {LembreteBlocoStoreModule} from './store/store.module';
import {RouterModule, Routes} from '@angular/router';
import {CdkLembreteFormModule} from '@cdk/components/lembrete/cdk-lembrete-form/cdk-lembrete-form.module';
import {MatListModule} from '@angular/material/list';

import {LoginService} from '../../../auth/login/login.service';
import {LembreteService} from '@cdk/services/lembrete.service';
import {ProcessoService} from '@cdk/services/processo.service';

const routes: Routes = [
    {
        path       : 'criar',
        component: ArquivistaLembreteBlocoComponent,
    }
];


@NgModule({
    declarations: [ArquivistaLembreteBlocoComponent],
    imports: [
        CommonModule,
        LembreteBlocoStoreModule,
        RouterModule.forChild(routes),
        CdkLembreteFormModule,
        MatListModule,
    ],
    providers: [
        LoginService,
        LembreteService,
        ProcessoService
    ]
})
export class ArquivistaLembreteBlocoModule {
}
