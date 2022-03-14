import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkWorkflowFormComponent} from './cdk-workflow-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroTarefaAutocompleteModule} from '../../genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkGeneroAtividadeAutocompleteModule} from '../../genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-autocomplete.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkWorkflowGridsearchModule} from '../cdk-workflow-autocomplete/cdk-workflow-gridsearch/cdk-workflow-gridsearch.module';
import {CdkGeneroAtividadeGridsearchModule} from '../../genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-gridsearch/cdk-genero-atividade-gridsearch.module';
import {CdkEspecieTarefaAutocompleteModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieTarefaGridsearchModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-gridsearch/cdk-especie-tarefa-gridsearch.module';
import {
    CdkGeneroProcessoAutocompleteModule
} from "../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module";
import {
    CdkGeneroProcessoGridsearchModule
} from "../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-gridsearch/cdk-genero-processo-gridsearch.module";


@NgModule({
    declarations: [CdkWorkflowFormComponent],
    exports: [
        CdkWorkflowFormComponent
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
        CdkGeneroAtividadeAutocompleteModule,
        MatIconModule,
        MatTooltipModule,
        CdkWorkflowGridsearchModule,
        CdkGeneroAtividadeGridsearchModule,
        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieTarefaGridsearchModule,
        CdkGeneroProcessoAutocompleteModule,
        CdkGeneroProcessoGridsearchModule
    ]
})
export class CdkWorkflowFormModule { }
