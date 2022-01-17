import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTransicaoWorkflowFormComponent} from './cdk-transicao-workflow-form.component';
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
import {CdkTransicaoWorkflowGridsearchModule} from '../cdk-transicao-workflow-autocomplete/cdk-transicao-workflow-gridsearch/cdk-transicao-workflow-gridsearch.module';
import {CdkGeneroAtividadeGridsearchModule} from '../../genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-gridsearch/cdk-genero-atividade-gridsearch.module';
import {CdkEspecieProcessoAutocompleteModule} from '../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkEspecieTarefaAutocompleteModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieProcessoGridsearchModule} from '../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-gridsearch/cdk-especie-processo-gridsearch.module';
import {CdkEspecieTarefaGridsearchModule} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-gridsearch/cdk-especie-tarefa-gridsearch.module';
import {CdkEspecieAtividadeAutocompleteModule} from '../../especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkEspecieAtividadeGridsearchModule} from '../../especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-gridsearch/cdk-especie-atividade-gridsearch.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [CdkTransicaoWorkflowFormComponent],
    exports: [
        CdkTransicaoWorkflowFormComponent
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
        CdkTransicaoWorkflowGridsearchModule,
        CdkGeneroAtividadeGridsearchModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieProcessoGridsearchModule,
        CdkEspecieTarefaGridsearchModule,
        CdkEspecieAtividadeAutocompleteModule,
        CdkEspecieAtividadeGridsearchModule,
        MatSelectModule
    ]
})
export class CdkTransicaoWorkflowFormModule { }
