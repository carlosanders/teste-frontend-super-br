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
import {CdkProcessoFormComponent} from './cdk-processo-form.component';
import {CdkEspecieProcessoAutocompleteModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkEspecieProcessoGridsearchModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-gridsearch/cdk-especie-processo-gridsearch.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {CdkModalidadeFaseAutocompleteModule} from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';
import {CdkModalidadeFaseGridsearchModule} from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-gridsearch/cdk-modalidade-fase-gridsearch.module';
import {CdkModalidadeMeioAutocompleteModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkModalidadeMeioGridsearchModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-gridsearch/cdk-modalidade-meio-gridsearch.module';
import {CdkClassificacaoAutocompleteModule} from '@cdk/components/classificacao/cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {CdkClassificacaoGridsearchModule} from '@cdk/components/classificacao/cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {CdkProcessoAutocompleteModule} from '../cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkGeneroSetorAutocompleteModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkGeneroSetorGridsearchModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-gridsearch/cdk-genero-setor-gridsearch.module';
import {CdkEspecieSetorAutocompleteModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkEspecieSetorGridsearchModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module';
import {MatSelectModule} from '@angular/material/select';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';
import {CdkClassificacaoGridTreeModule} from '../../classificacao/cdk-classificacao-grid-tree/cdk-classificacao-grid-tree.module';
import {CdkClassificacaoGridTreeService} from '../../classificacao/cdk-classificacao-grid-tree/services/cdk-classificacao-grid-tree.service';
import {FavoritoService} from '../../../services/favorito.service';
import {CdkConfiguracaoNupGridsearchModule} from '../../configuracao-nup/cdk-configuracao-nup-autocomplete/cdk-configuracao-nup-gridsearch/cdk-configuracao-nup-gridsearch.module';
import {CdkConfiguracaoNupAutocompleteModule} from '../../configuracao-nup/cdk-configuracao-nup-autocomplete/cdk-configuracao-nup-autocomplete.module';
import {NgxCurrencyModule} from "ngx-currency";

@NgModule({
    declarations: [
        CdkProcessoFormComponent,
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
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatTooltipModule,
        MatRadioModule,
        NgxUpperCaseDirectiveModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkEspecieProcessoGridsearchModule,
        CdkModalidadeFaseAutocompleteModule,
        CdkModalidadeFaseGridsearchModule,
        CdkModalidadeMeioAutocompleteModule,
        CdkModalidadeMeioGridsearchModule,
        CdkClassificacaoAutocompleteModule,
        CdkClassificacaoGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkPessoaAutocompleteModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        MatCardModule,
        MatSlideToggleModule,
        CdkGeneroSetorAutocompleteModule,
        CdkGeneroSetorGridsearchModule,
        CdkEspecieSetorAutocompleteModule,
        CdkEspecieSetorGridsearchModule,
        MatSelectModule,
        CdkPessoaGridsearchModule,
        CdkClassificacaoGridTreeModule,

        CdkConfiguracaoNupAutocompleteModule,
        CdkConfiguracaoNupGridsearchModule,
        NgxCurrencyModule
    ],
    providers: [
        CdkClassificacaoGridTreeService,
        FavoritoService
    ],
    exports: [
        CdkProcessoFormComponent
    ]
})
export class CdkProcessoFormModule {
}
