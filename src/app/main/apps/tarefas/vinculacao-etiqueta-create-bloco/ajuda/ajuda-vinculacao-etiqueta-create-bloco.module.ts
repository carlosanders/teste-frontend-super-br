import {NgModule} from '@angular/core';

import {AjudaVinculacaoEtiquetaCreateBlocoComponent} from './ajuda-vinculacao-etiqueta-create-bloco.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaVinculacaoEtiquetaCreateBlocoComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaVinculacaoEtiquetaCreateBlocoComponent
    ]
})
export class AjudaVinculacaoEtiquetaCreateBlocoModule {
}