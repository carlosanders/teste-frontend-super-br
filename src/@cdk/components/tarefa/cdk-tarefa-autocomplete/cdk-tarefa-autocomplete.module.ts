import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {CdkTarefaAutocompleteComponent} from './cdk-tarefa-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTarefaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TarefaService,
    ],
    exports: [
        CdkTarefaAutocompleteComponent
    ]
})
export class CdkTarefaAutocompleteModule {
}
