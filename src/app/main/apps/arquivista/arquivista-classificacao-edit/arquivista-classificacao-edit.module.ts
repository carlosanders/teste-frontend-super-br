import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoEditComponent} from './arquivista-classificacao-edit.component';
import {CdkClassificacaoTreeModule} from '@cdk/components/classificacao/cdk-classificacao-tree/cdk-classificacao-tree.module';
import {StoreArquivistaClassificacaoModule} from './store/store.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';
import {LoginService} from '../../../auth/login/login.service';
import {DirectivesModule} from '../../../../../@cdk/directives/directives';


@NgModule({
    declarations: [ArquivistaClassificacaoEditComponent],
    imports: [
        CommonModule,
        CdkClassificacaoTreeModule,
        StoreArquivistaClassificacaoModule,
        DirectivesModule
    ],
    providers: [
        ClassificacaoService,
        CdkClassificacaoTreeService,
        LoginService
    ]
})
export class ArquivistaClassificacaoEditModule {
}
