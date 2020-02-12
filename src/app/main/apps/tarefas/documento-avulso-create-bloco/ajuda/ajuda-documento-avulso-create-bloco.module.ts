import {NgModule} from '@angular/core';

import {AjudaDocumentoAvulsoCreateBlocoComponent} from './ajuda-documento-avulso-create-bloco.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaDocumentoAvulsoCreateBlocoComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports: [
        AjudaDocumentoAvulsoCreateBlocoComponent
    ]
})
export class AjudaDocumentoAvulsoCreateBlocoModule {
}