import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AjudaArquivistaComponent } from './ajuda-arquivista.component';
import { CdkSharedModule } from '../../../../../@cdk/shared.module';

import { AjudaTransicoesModule } from 'app/main/apps/processo/processo-edit/transicoes/ajuda/ajuda-transicoes.module';



@NgModule({
    declarations: [
        AjudaArquivistaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaTransicoesModule,


    ],
    providers: [
    ],

    exports: [
        AjudaArquivistaComponent
   ]
})
export class AjudaArquivistaModule {
}