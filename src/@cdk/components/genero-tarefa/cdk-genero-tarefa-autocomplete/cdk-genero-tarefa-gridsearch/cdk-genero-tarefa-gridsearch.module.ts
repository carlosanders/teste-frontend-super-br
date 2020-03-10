import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {GeneroTarefaService} from '@cdk/services/genero-tarefa.service';
import {CdkGeneroTarefaGridsearchComponent} from './cdk-genero-tarefa-gridsearch.component';
import {CdkGeneroTarefaGridModule} from '@cdk/components/genero-tarefa/cdk-genero-tarefa-grid/cdk-genero-tarefa-grid.module';

@NgModule({
    declarations: [
        CdkGeneroTarefaGridsearchComponent
    ],
    imports: [

        CdkGeneroTarefaGridModule,

        CdkSharedModule,
    ],
    providers: [
        GeneroTarefaService
    ],
    exports: [
        CdkGeneroTarefaGridsearchComponent
    ]
})
export class CdkGeneroTarefaGridsearchModule {
}
