import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkAssuntoAdministrativoFormComponent} from './cdk-assunto-administrativo-form.component';
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
import {CdkAssuntoAdministrativoGridsearchModule} from '../cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-gridsearch/cdk-assunto-administrativo-gridsearch.module';
import {CdkAssuntoAdministrativoAutocompleteModule} from '../cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';


@NgModule({
    declarations: [CdkAssuntoAdministrativoFormComponent],
    exports: [
        CdkAssuntoAdministrativoFormComponent
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
        CdkAssuntoAdministrativoGridsearchModule,
        CdkAssuntoAdministrativoAutocompleteModule
    ]
})
export class CdkAssuntoAdministrativoFormModule { }
