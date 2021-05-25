import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkEspecieRelevanciaFormComponent} from './cdk-especie-relevancia-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroTarefaAutocompleteModule} from '../../genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkGeneroRelevanciaAutocompleteModule} from '../../genero-relevancia/cdk-genero-relevancia-autocomplete/cdk-genero-relevancia-autocomplete.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkEspecieRelevanciaGridsearchModule} from '../cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-gridsearch/cdk-especie-relevancia-gridsearch.module';
import {CdkGeneroRelevanciaGridsearchModule} from '../../genero-relevancia/cdk-genero-relevancia-autocomplete/cdk-genero-relevancia-gridsearch/cdk-genero-relevancia-gridsearch.module';


@NgModule({
    declarations: [CdkEspecieRelevanciaFormComponent],
    exports: [
        CdkEspecieRelevanciaFormComponent
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
        CdkGeneroRelevanciaAutocompleteModule,
        MatIconModule,
        MatTooltipModule,
        CdkEspecieRelevanciaGridsearchModule,
        CdkGeneroRelevanciaGridsearchModule
    ]
})
export class CdkEspecieRelevanciaFormModule {
}
