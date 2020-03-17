import {NgModule} from '@angular/core';

import {AjudaAtividadeCreateBlocoComponent} from './ajuda-atividade-create-bloco.component';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaAtividadeCreateBlocoComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaAtividadeCreateBlocoComponent
    ]
})
export class AjudaAtividadeCreateBlocoModule {
}