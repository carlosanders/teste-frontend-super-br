import {NgModule} from '@angular/core';

import {AjudaUploadBlocoComponent} from './ajuda-upload-bloco.component';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaUploadBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaUploadBlocoComponent
    ]
})
export class AjudaUploadBlocoModule {
}