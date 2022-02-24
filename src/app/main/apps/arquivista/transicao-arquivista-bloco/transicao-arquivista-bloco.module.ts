import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TransicaoArquivistaBlocoComponent} from './transicao-arquivista-bloco.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {TransicaoService} from '@cdk/services/transicao.service';
import {TransicaoArquivistaStoreModule} from './store/store.module';
import {CdkRealizarTransicaoFormModule} from '@cdk/components/transicao/cdk-realizar-transicao/cdk-realizar-transicao-form/cdk-realizar-transicao-form.module';
import {MatListModule} from '@angular/material/list';
import {modulesConfig} from 'modules/modules-config';
import {DirectivesModule} from '@cdk/directives/directives';
import {CdkConfirmDialogModule} from '@cdk/components';
import * as fromGuards from './store/guards';
import {MatButtonModule} from '@angular/material/button';
import {CdkSharedModule} from "../../../../../@cdk/shared.module";

const routes: Routes = [
    {
        path: '',
        component: TransicaoArquivistaBlocoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/arquivista/transicao-arquivista-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TransicaoArquivistaBlocoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TransicaoArquivistaStoreModule,
        CdkRealizarTransicaoFormModule,
        MatListModule,
        CdkConfirmDialogModule,
        DirectivesModule,
        MatButtonModule,
        CdkSharedModule
    ],
    providers: [
        ProcessoService,
        TransicaoService,
        fromGuards.ResolveGuard
    ]
})
export class TransicaoArquivistaBlocoModule {
}
