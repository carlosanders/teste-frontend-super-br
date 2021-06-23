import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkFavoritoFormComponent} from './cdk-favorito-form.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkEspecieAtividadeAutocompleteModule} from '../../especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkEspecieAtividadeGridsearchModule} from '../../especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-gridsearch/cdk-especie-atividade-gridsearch.module';
import {CdkEspecieTarefaAutocompleteModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieTarefaGridsearchModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-gridsearch/cdk-especie-tarefa-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        CdkFavoritoFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        NgxUpperCaseDirectiveModule,
        MatRadioModule,

        CdkEspecieAtividadeAutocompleteModule,
        CdkEspecieAtividadeGridsearchModule,
        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieTarefaGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        CdkSharedModule,
        MatCardModule,
    ],
    providers: [],
    exports: [
        CdkFavoritoFormComponent
    ]
})
export class CdkFavoritoFormModule {
}
