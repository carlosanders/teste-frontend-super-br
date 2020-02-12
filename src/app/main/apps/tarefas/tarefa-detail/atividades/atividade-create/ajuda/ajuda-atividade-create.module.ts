import {NgModule} from '@angular/core';

import {AjudaAtividadeCreateComponent} from './ajuda-atividade-create.component';
import {FuseSharedModule} from '../../../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaAtividadeCreateComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaAtividadeCreateComponent 
    ]
})
export class AjudaAtividadeCreateModule {
}
