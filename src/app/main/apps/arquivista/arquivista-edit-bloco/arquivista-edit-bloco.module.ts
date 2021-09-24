import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ArquivistaEditBlocoComponent} from './arquivista-edit-bloco.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {ArquivistaEditBlocoStoreModule} from './store/store.module';
import {MatListModule} from '@angular/material/list';
import {modulesConfig} from 'modules/modules-config';
import {DirectivesModule} from '@cdk/directives/directives';
import {CdkConfirmDialogModule} from '@cdk/components';
import {CdkProcessoArquivistaFormModule} from '@cdk/components/processo/cdk-processo-arquivista-form/cdk-processo-arquivista-form.module';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';
import {CdkClassificacaoGridTreeService} from '@cdk/components/classificacao/cdk-classificacao-grid-tree/services/cdk-classificacao-grid-tree.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaEditBlocoComponent,
    }
];

const path = 'app/main/apps/arquivista/arquivista-edit-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ArquivistaEditBlocoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ArquivistaEditBlocoStoreModule,

        MatListModule,
        CdkConfirmDialogModule,
        DirectivesModule,
        CdkProcessoArquivistaFormModule,
        MatSlideToggleModule,
        FormsModule,
        MatButtonModule
    ],
    providers: [
        ProcessoService,
        CdkClassificacaoTreeService,
        CdkClassificacaoGridTreeService
    ]
})
export class ArquivistaEditBlocoModule {
}
