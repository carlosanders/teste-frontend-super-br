import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CriarDataPrevistaTransicaoComponent} from './criar-data-prevista-transicao.component';
import {CriarDataPrevistaStoreModule} from './store/store.module';
import {LoginService} from '../../../auth/login/login.service';
import {ProcessoService} from '../../../../../@cdk/services/processo.service';
import {CdkDataPrevistaTransicaoModule} from '../../../../../@cdk/components/transicao/data-prevista-transicao/cdk-data-prevista-transicao.module';


@NgModule({
    declarations: [CriarDataPrevistaTransicaoComponent],
    imports: [
        CommonModule,
        CriarDataPrevistaStoreModule,
        CdkDataPrevistaTransicaoModule
    ],
    providers: [
        ProcessoService,
        LoginService,
    ],
})
export class CriarDataPrevistaTransicaoModule {
}
