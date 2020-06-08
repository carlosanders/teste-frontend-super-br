
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ArquivistaClassificacaoBlocoComponent} from './arquivista-classificacao-bloco.component';
import {ArquivistaClassificacaoBlocoStoreModule} from './store/store.module';
import {CdkClassificacaoTreeModule} from '@cdk/components/classificacao/cdk-classificacao-tree/cdk-classificacao-tree.module';
import {MatListModule} from '@angular/material/list';

import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path       : 'editar',
        component: ArquivistaClassificacaoBlocoComponent,
    }
];

const path = 'app/main/apps/arquivista/arquivista-classificacao-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ArquivistaClassificacaoBlocoComponent],
    imports: [
        CommonModule,
        ArquivistaClassificacaoBlocoStoreModule,
        RouterModule.forChild(routes),
        CdkClassificacaoTreeModule,
        MatListModule,
    ],
    providers: [
        ClassificacaoService,
        CdkClassificacaoTreeService,
        LoginService,
    ]
})
export class ArquivistaClassificacaoBlocoModule {
}
