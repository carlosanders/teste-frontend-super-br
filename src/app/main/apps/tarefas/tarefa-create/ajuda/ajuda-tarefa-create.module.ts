import {NgModule} from '@angular/core';

import {AjudaTarefaCreateComponent} from './ajuda-tarefa-create.component';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaTarefaCreateComponent
    ],
    imports: [
        CdkSharedModule
    ],
    providers: [
    ]
})
export class AjudaTarefaCreateModule {
}
