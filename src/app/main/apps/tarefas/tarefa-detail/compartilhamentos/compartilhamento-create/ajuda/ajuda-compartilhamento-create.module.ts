import {NgModule} from '@angular/core';

import {AjudaCompartilhamentoCreateComponent} from './ajuda-compartilhamento-create.component';
import {FuseSharedModule} from '../../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaCompartilhamentoCreateComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaCompartilhamentoCreateComponent
    ]
})
export class AjudaCompartilhamentoCreateModule {
}
