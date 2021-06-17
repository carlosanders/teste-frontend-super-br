import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroTarefaService} from '@cdk/services/genero-tarefa.service';
import {CdkGeneroTarefaAutocompleteComponent} from './cdk-genero-tarefa-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroTarefaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
