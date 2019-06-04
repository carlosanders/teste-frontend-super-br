import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { CdkEspecieTarefaGridFilterComponent } from './cdk-especie-tarefa-grid-filter.component';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaGridFilterComponent
    ]
})
export class CdkEspecieTarefaGridFilterModule {
}
