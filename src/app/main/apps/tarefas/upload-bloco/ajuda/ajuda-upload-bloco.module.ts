import {NgModule} from '@angular/core';

import {AjudaUploadBlocoComponent} from './ajuda-upload-bloco.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaUploadBlocoComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaUploadBlocoComponent
    ]
})
export class AjudaUploadBlocoModule {
}