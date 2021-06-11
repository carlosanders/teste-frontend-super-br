import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkEspecieTarefaFormComponent} from './cdk-especie-tarefa-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroTarefaAutocompleteModule} from '../../genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkEspecieTarefaGridsearchModule} from '../cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-gridsearch/cdk-especie-tarefa-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkGeneroTarefaGridsearchModule} from '../../genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-gridsearch/cdk-genero-tarefa-gridsearch.module';


@NgModule({
    declarations: [CdkEspecieTarefaFormComponent],
    exports: [
        CdkEspecieTarefaFormComponent
    ],
    imports: [
        CommonModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        CdkGeneroTarefaAutocompleteModule,
        CdkEspecieTarefaGridsearchModule,
        MatIconModule,
        MatTooltipModule,
        CdkGeneroTarefaGridsearchModule
    ]
})
export class CdkEspecieTarefaFormModule { }
