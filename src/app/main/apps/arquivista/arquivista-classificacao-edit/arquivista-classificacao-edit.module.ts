import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoEditComponent} from './arquivista-classificacao-edit.component';
import {CdkClassificacaoTreeModule} from '../../../../../@cdk/components/classificacao/cdk-classificacao-tree/cdk-classificacao-tree.module';
import {StoreArquivistaClassificacaoModule} from './store/store.module';
import {ClassificacaoService} from '../../../../../@cdk/services/classificacao.service';


@NgModule({
    declarations: [ArquivistaClassificacaoEditComponent],
    imports: [
        CommonModule,
        CdkClassificacaoTreeModule,
        StoreArquivistaClassificacaoModule
    ],
    providers: [
        ClassificacaoService
    ]
})
export class ArquivistaClassificacaoEditModule {
}
