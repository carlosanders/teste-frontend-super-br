import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


import {AjudaTransicoesComponent} from './ajuda-transicoes.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTransicoesComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaTransicoesComponent
    ]
})
export class AjudaTransicoesModule {
}