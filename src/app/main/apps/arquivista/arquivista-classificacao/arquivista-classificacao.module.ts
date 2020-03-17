import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoComponent} from './arquivista-classificacao.component';
import {CdkTransicaoFormModule} from '@cdk/components/transicao/cdk-transicao-form/cdk-transicao-form.module';
import {RouterModule, Routes} from '@angular/router';
import {CdkRealizarTransicaoFormModule} from '../../../../../@cdk/components/transicao/cdk-realizar-transicao/cdk-realizar-transicao-form/cdk-realizar-transicao-form.module';
import * as fromGuards from './store/guards';
import {TransicaoService} from '../../../../../@cdk/services/transicao.service';
import {ArquivistaClassificacaoStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaClassificacaoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [ArquivistaClassificacaoComponent],
    imports: [
        CommonModule,
        CdkTransicaoFormModule,
        CdkRealizarTransicaoFormModule,
        RouterModule.forChild(routes),
        ArquivistaClassificacaoStoreModule

    ],
    providers: [
        TransicaoService,

        fromGuards.ResolveGuard
    ]
})
export class ArquivistaClassificacaoModule {
}
