import {NgModule} from '@angular/core';

import {AjudaVinculacoesProcessosComponent} from './ajuda-vinculacoes-processos.component';
import {FuseSharedModule} from '../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaVinculacoesProcessosComponent
    ],
    imports: [
        FuseSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaVinculacoesProcessosComponent
    ]
})
export class AjudaVinculacoesProcessosModule {
}