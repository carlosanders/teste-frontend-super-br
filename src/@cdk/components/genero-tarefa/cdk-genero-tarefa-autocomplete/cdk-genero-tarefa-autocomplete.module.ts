import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroTarefaService} from '@cdk/services/genero-tarefa.service';
import {CdkGeneroTarefaAutocompleteComponent} from './cdk-genero-tarefa-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroTarefaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroTarefaService,
    ],
    exports: [
        CdkGeneroTarefaAutocompleteComponent
    ]
})
export class CdkGeneroTarefaAutocompleteModule {
}
