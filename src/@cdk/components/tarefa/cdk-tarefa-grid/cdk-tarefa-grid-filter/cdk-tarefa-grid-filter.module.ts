import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { CdkTarefaGridFilterComponent } from './cdk-tarefa-grid-filter.component';

@NgModule({
    declarations: [
        CdkTarefaGridFilterComponent,
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
        CdkTarefaGridFilterComponent
    ]
})
export class CdkTarefaGridFilterModule {
}
