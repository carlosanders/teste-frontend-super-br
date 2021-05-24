import {NgModule} from '@angular/core';

import {AjudaDocumentosAvulsosComponent} from './ajuda-documentos-avulsos.component';
import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaDocumentosAvulsosComponent
    ],
    imports: [
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        AjudaDocumentosAvulsosComponent
    ]
})
export class AjudaDocumentosAvulsosModule {
}
