import {NgModule} from '@angular/core';

import {AjudaCompartilhamentoCreateBlocoComponent} from './ajuda-compartilhamento-create-bloco.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaCompartilhamentoCreateBlocoComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaCompartilhamentoCreateBlocoComponent
    ]
})
export class AjudaCompartilhamentoCreateBlocoModule {
}