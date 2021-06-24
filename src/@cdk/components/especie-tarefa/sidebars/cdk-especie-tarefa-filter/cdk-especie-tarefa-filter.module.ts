import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaFilterComponent} from './cdk-especie-tarefa-filter.component';
import {CdkGeneroTarefaAutocompleteModule} from '@cdk/components/genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatetimepickerModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkGeneroTarefaAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaFilterComponent
    ]
})
export class CdkEspecieTarefaFilterModule {
}
