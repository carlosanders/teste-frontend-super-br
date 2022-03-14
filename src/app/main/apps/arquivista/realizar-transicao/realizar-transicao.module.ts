import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealizarTransicaoComponent} from './realizar-transicao.component';
import {CdkTransicaoFormModule} from '@cdk/components/transicao/cdk-transicao-form/cdk-transicao-form.module';
import {CdkRealizarTransicaoFormModule} from '@cdk/components/transicao/cdk-realizar-transicao/cdk-realizar-transicao-form/cdk-realizar-transicao-form.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {RealizarTransacaoStoreModule} from './store/store.module';
import {MatListModule} from '@angular/material/list';
import {ProcessoService} from '@cdk/services/processo.service';
import {DirectivesModule} from '@cdk/directives/directives';
import {CdkConfirmDialogModule} from '@cdk/components';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from "../../../../../@cdk/shared.module";

const routes: Routes = [
    {
        path: '',
        component: RealizarTransicaoComponent
    }
];
@NgModule({
    declarations: [RealizarTransicaoComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        CdkTransicaoFormModule,
        CdkRealizarTransicaoFormModule,
        RealizarTransacaoStoreModule,
        MatDialogModule,

        MatListModule,
        DirectivesModule,
        CdkConfirmDialogModule,
        CdkSharedModule
    ],
    providers: [
        TransicaoService,
        ProcessoService,
    ],
    entryComponents: [
        CdkConfirmDialogComponent
    ]
})
export class RealizarTransicaoModule {
}
