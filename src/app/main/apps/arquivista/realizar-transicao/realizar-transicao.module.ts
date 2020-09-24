import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealizarTransicaoComponent} from './realizar-transicao.component';
import {CdkTransicaoFormModule} from '@cdk/components/transicao/cdk-transicao-form/cdk-transicao-form.module';
import {CdkRealizarTransicaoFormModule} from '@cdk/components/transicao/cdk-realizar-transicao/cdk-realizar-transicao-form/cdk-realizar-transicao-form.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {RealizarTransacaoStoreModule} from './store/store.module';
import {MatListModule} from '@angular/material/list';
import {ProcessoService} from '../../../../../@cdk/services/processo.service';
import {DirectivesModule} from '../../../../../@cdk/directives/directives';


@NgModule({
    declarations: [RealizarTransicaoComponent],
    imports: [
        CommonModule,
        CdkTransicaoFormModule,
        CdkRealizarTransicaoFormModule,
        RealizarTransacaoStoreModule,
        MatListModule,
        DirectivesModule
    ],
    providers: [
        TransicaoService,
        ProcessoService
    ]
})
export class RealizarTransicaoModule {
}
