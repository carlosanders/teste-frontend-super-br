import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {CdkTarefaAutocompleteComponent} from './cdk-tarefa-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTarefaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
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
