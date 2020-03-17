import {NgModule} from '@angular/core';

import {AjudaCompartilhamentoCreateBlocoComponent} from './ajuda-compartilhamento-create-bloco.component';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaCompartilhamentoCreateBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaCompartilhamentoCreateBlocoComponent
    ]
})
export class AjudaCompartilhamentoCreateBlocoModule {
}