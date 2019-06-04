import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { CdkEspecieTarefaGridsearchComponent } from './cdk-especie-tarefa-gridsearch.component';
import { CdkEspecieTarefaGridModule } from '@cdk/components/especie-tarefa/cdk-especie-tarefa-grid/cdk-especie-tarefa-grid.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridsearchComponent
    ],
    imports: [

        CdkEspecieTarefaGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        EspecieTarefaService
    ],
    exports: [
        CdkEspecieTarefaGridsearchComponent
    ]
})
export class CdkEspecieTarefaGridsearchModule {
}
