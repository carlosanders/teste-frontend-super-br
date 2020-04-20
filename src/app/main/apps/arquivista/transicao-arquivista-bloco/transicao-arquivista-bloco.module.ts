import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TransicaoArquivistaBlocoComponent} from './transicao-arquivista-bloco.component';
import {ProcessoService} from '../../../../../@cdk/services/processo.service';
import {LoginService} from '../../../auth/login/login.service';
import {TransicaoService} from '../../../../../@cdk/services/transicao.service';
import {TransicaoArquivistaStoreModule} from './store/store.module';
import {CdkRealizarTransicaoFormModule} from '../../../../../@cdk/components/transicao/cdk-realizar-transicao/cdk-realizar-transicao-form/cdk-realizar-transicao-form.module';
import {MatListModule} from '@angular/material/list';


const routes: Routes = [
    {
        path: 'criar',
        component: TransicaoArquivistaBlocoComponent,
    }
];

@NgModule({
    declarations: [TransicaoArquivistaBlocoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TransicaoArquivistaStoreModule,
        CdkRealizarTransicaoFormModule,
        MatListModule
    ],
    providers: [
        ProcessoService,
        TransicaoService,
        LoginService
    ]
})
export class TransicaoArquivistaBlocoModule {
}