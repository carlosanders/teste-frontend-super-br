import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoBlocoComponent} from './arquivista-classificacao-bloco.component';
import {ArquivistaClassificacaoBlocoStoreModule} from './store/store.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkClassificacaoTreeModule} from '../../../../../@cdk/components/classificacao/cdk-classificacao-tree/cdk-classificacao-tree.module';
import {MatListModule} from '@angular/material/list';

const routes: Routes = [
    {
        path       : 'editar',
        component: ArquivistaClassificacaoBlocoComponent,
    }
];

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
        CdkClassificacaoTreeService
    ]
})
export class ArquivistaClassificacaoBlocoModule {
}
