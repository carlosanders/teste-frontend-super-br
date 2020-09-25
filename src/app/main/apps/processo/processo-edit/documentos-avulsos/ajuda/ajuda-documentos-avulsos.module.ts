import {NgModule} from '@angular/core';

import {AjudaDocumentosAvulsosComponent} from './ajuda-documentos-avulsos.component';
import {FuseSharedModule} from '../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaDocumentosAvulsosComponent
    ],
    imports: [
        FuseSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaDocumentosAvulsosComponent
    ]
})
export class AjudaDocumentosAvulsosModule {
}
