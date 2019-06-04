import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteComponent} from './cdk-especie-tarefa-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaAutocompleteComponent
    ]
})
export class CdkEspecieTarefaAutocompleteModule {
}
