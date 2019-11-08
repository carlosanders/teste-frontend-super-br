import {NgModule} from '@angular/core';

import {AjudaTarefaCreateComponent} from './ajuda-tarefa-create.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaTarefaCreateComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ]
})
export class AjudaTarefaCreateModule {
}
