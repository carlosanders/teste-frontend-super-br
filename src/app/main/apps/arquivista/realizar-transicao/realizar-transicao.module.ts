import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealizarTransicaoComponent} from './realizar-transicao.component';
import {CdkTransicaoFormModule} from '@cdk/components/transicao/cdk-transicao-form/cdk-transicao-form.module';
import {RouterModule, Routes} from '@angular/router';
import {CdkRealizarTransicaoFormModule} from '../../../../../@cdk/components/transicao/cdk-realizar-transicao/cdk-realizar-transicao-form/cdk-realizar-transicao-form.module';
import * as fromGuards from './store/guards';
import {TransicaoService} from '../../../../../@cdk/services/transicao.service';
import {RealizarTransacaoStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: ':transicaoHandle',
        component: RealizarTransicaoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [RealizarTransicaoComponent],
    imports: [
        CommonModule,
        CdkTransicaoFormModule,
        CdkRealizarTransicaoFormModule,
        RouterModule.forChild(routes),
        RealizarTransacaoStoreModule

    ],
    providers: [
        TransicaoService,

        fromGuards.ResolveGuard
    ]
})
export class RealizarTransicaoModule {
}
