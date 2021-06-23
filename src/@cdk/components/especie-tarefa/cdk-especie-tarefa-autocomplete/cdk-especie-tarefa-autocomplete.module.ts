import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteComponent} from './cdk-especie-tarefa-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
