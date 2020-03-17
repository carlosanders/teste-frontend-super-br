import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaClassificacaoEditComponent} from './arquivista-classificacao-edit.component';
import {CdkClassificacaoTreeModule} from '../../../../../@cdk/components/classificacao/cdk-classificacao-tree/cdk-classificacao-tree.module';


@NgModule({
    declarations: [ArquivistaClassificacaoEditComponent],
    imports: [
        CommonModule,
        CdkClassificacaoTreeModule
    ]
})
export class ArquivistaClassificacaoEditModule {
}
