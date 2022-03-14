import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteMultipleComponent} from './cdk-especie-tarefa-autocomplete-multiple.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {MatPseudoCheckboxModule} from '@angular/material/core';
import {CdkAutocompleteMultipleModule} from '../../autocomplete-multiple/cdk-autocomplete-multiple.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    declarations: [
        CdkEspecieTarefaAutocompleteMultipleComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
        MatPseudoCheckboxModule,
        CdkAutocompleteMultipleModule,
        MatCheckboxModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaAutocompleteMultipleComponent
    ]
})
export class CdkEspecieTarefaAutocompleteMultipleModule {
}
