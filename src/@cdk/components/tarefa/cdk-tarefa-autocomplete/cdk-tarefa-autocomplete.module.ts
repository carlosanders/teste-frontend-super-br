import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ProcessosService} from 'src/@cdk/services/processos.service';
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
        ProcessosService,
    ],
    exports: [
        CdkTarefaAutocompleteComponent
    ]
})
export class CdkTarefaAutocompleteModule {
}
