import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkEspecieProcessoFormComponent} from './cdk-especie-processo-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkEspecieProcessoGridsearchModule} from '../cdk-especie-processo-autocomplete/cdk-especie-processo-gridsearch/cdk-especie-processo-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkGeneroProcessoGridsearchModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-gridsearch/cdk-genero-processo-gridsearch.module';
import {CdkClassificacaoAutocompleteModule} from '../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {CdkClassificacaoGridsearchModule} from '../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module';
import {CdkModalidadeMeioAutocompleteModule} from '../../modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkModalidadeMeioGridsearchModule} from '../../modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-gridsearch/cdk-modalidade-meio-gridsearch.module';


@NgModule({
    declarations: [CdkEspecieProcessoFormComponent],
    exports: [
        CdkEspecieProcessoFormComponent
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
        CdkGeneroProcessoAutocompleteModule,
        CdkEspecieProcessoGridsearchModule,
        MatIconModule,
        MatTooltipModule,
        CdkGeneroProcessoGridsearchModule,
        CdkClassificacaoAutocompleteModule,
        CdkClassificacaoGridsearchModule,
        CdkModalidadeMeioAutocompleteModule,
        CdkModalidadeMeioGridsearchModule
    ]
})
export class CdkEspecieProcessoFormModule { }
