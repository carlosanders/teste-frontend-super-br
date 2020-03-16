import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TarefaService} from '@cdk/services/tarefa.service';
import {CdkTarefaGridsearchComponent} from './cdk-tarefa-gridsearch.component';
import {CdkTarefaGridModule} from '@cdk/components/tarefa/cdk-tarefa-grid/cdk-tarefa-grid.module';

@NgModule({
    declarations: [
        CdkTarefaGridsearchComponent
    ],
    imports: [

        CdkTarefaGridModule,

        CdkSharedModule,
    ],
    providers: [
        TarefaService
    ],
    exports: [
        CdkTarefaGridsearchComponent
    ]
})
export class CdkTarefaGridsearchModule {
}
