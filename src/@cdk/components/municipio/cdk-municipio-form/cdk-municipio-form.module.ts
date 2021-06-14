import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkMunicipioFormComponent} from './cdk-municipio-form.component';
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
import {CdkEstadoAutocompleteModule} from '../../estado/cdk-estado-autocomplete/cdk-estado-autocomplete.module';
import {CdkEstadoGridsearchModule} from '../../estado/cdk-estado-autocomplete/cdk-estado-gridsearch/cdk-estado-gridsearch.module';


@NgModule({
    declarations: [CdkMunicipioFormComponent],
    exports: [
        CdkMunicipioFormComponent
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
        CdkEstadoAutocompleteModule,
        CdkEstadoGridsearchModule
    ]
})
export class CdkMunicipioFormModule { }
