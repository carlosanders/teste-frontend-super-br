import {NgModule} from '@angular/core';

import {AjudaTarefaEditBlocoComponent} from './ajuda-tarefa-edit-bloco.component';
import {FuseSharedModule} from '../../../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        AjudaTarefaEditBlocoComponent
    ],
    imports: [
        FuseSharedModule
    ],
    providers: [
    ],
    exports:    [
        AjudaTarefaEditBlocoComponent
    ]
})
export class AjudaTarefaEditBlocoModule {
}