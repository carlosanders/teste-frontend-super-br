import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkEspecieAtividadeFormComponent } from './cdk-especie-atividade-form.component';
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
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkEspecieAtividadeGridsearchModule} from '../cdk-especie-atividade-autocomplete/cdk-especie-atividade-gridsearch/cdk-especie-atividade-gridsearch.module';
import {CdkGeneroAtividadeGridsearchModule} from '../../genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-gridsearch/cdk-genero-atividade-gridsearch.module';



@NgModule({
    declarations: [CdkEspecieAtividadeFormComponent],
    exports: [
        CdkEspecieAtividadeFormComponent
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
        CdkEspecieAtividadeGridsearchModule,
        CdkGeneroAtividadeGridsearchModule
    ]
})
export class CdkEspecieAtividadeFormModule { }
