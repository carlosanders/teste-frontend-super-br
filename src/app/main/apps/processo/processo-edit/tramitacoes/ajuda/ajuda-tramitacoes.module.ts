import {NgModule} from '@angular/core';

import {AjudaTramitacoesComponent} from './ajuda-tramitacoes.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTramitacoesComponent
    ],
    imports: [
        CdkSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaTramitacoesComponent
    ]
})
export class AjudaTramitacoesModule {
}