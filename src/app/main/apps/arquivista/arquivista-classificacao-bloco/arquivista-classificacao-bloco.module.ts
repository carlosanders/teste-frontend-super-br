import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoBlocoComponent} from './arquivista-classificacao-bloco.component';
import {ArquivistaClassificacaoBlocoStoreModule} from './store/store.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';


@NgModule({
    declarations: [ArquivistaClassificacaoBlocoComponent],
    imports: [
        CommonModule,
        ArquivistaClassificacaoBlocoStoreModule
    ],
    providers: [
        ClassificacaoService,
        CdkClassificacaoTreeService
    ]
})
export class ArquivistaClassificacaoBlocoModule {
}
