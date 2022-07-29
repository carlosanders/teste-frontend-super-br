import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkTarefaFilterComponent} from './cdk-tarefa-filter.component';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEspecieTarefaAutocompleteModule} from '../../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatDividerModule} from '@angular/material/divider';
import {CdkPessoaAutocompleteModule} from '../../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkAssuntoAutocompleteModule} from '../../../assunto/cdk-assunto-autocomplete/cdk-assunto-autocomplete.module';
import {CdkAssuntoAdministrativoAutocompleteModule} from '../../../assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CdkEspecieRelevanciaAutocompleteModule} from '../../../especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-autocomplete.module';
import {CdkSearchBarEtiquetasModule} from "../../../search-bar-etiquetas/search-bar-etiquetas.module";
import {
    CdkEspecieTarefaAutocompleteMultipleModule
} from "../../../especie-tarefa/cdk-especie-tarefa-autocomplete-multiple/cdk-especie-tarefa-autocomplete-multiple.module";
import {
    CdkEspecieTarefaAutocompleteChiplistModule
} from "../../../especie-tarefa/cdk-especie-tarefa-autocomplete-multiple/cdk-especie-tarefa-autocomplete-chiplist/cdk-especie-tarefa-autocomplete-chiplist.module";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
    declarations: [
        CdkTarefaFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,
        MatChipsModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkProcessoAutocompleteModule,
        CdkEspecieTarefaAutocompleteModule,
        CdkSetorAutocompleteModule,
        MatExpansionModule,
        MatDividerModule,
        CdkPessoaAutocompleteModule,
        CdkAssuntoAutocompleteModule,
        CdkAssuntoAdministrativoAutocompleteModule,
        CdkDateFilterModule,
        CdkEspecieTarefaAutocompleteMultipleModule,
        CdkEspecieTarefaAutocompleteChiplistModule,
        MatMenuModule,
        MatButtonToggleModule,
        CdkEspecieRelevanciaAutocompleteModule,
        CdkSearchBarEtiquetasModule,
    ],
    providers: [
        EspecieTarefaService
    ],
    exports: [
        CdkTarefaFilterComponent
    ]
})
export class CdkTarefaFilterModule {
}
