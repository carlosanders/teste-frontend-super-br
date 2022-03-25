import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteChiplistComponent} from './cdk-especie-tarefa-autocomplete-chiplist.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {MatPseudoCheckboxModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    declarations: [
        CdkEspecieTarefaAutocompleteChiplistComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
        MatPseudoCheckboxModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatChipsModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaAutocompleteChiplistComponent
    ]
})
export class CdkEspecieTarefaAutocompleteChiplistModule {
}
