import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkModalidadeAcaoEtiquetaFormComponent} from './cdk-modalidade-acao-etiqueta-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkModalidadeAcaoEtiquetaGridsearchModule} from '../cdk-modalidade-acao-etiqueta-autocomplete/cdk-modalidade-acao-etiqueta-gridsearch/cdk-modalidade-acao-etiqueta-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkModalidadeEtiquetaAutocompleteModule} from '../../modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';
import {CdkModalidadeEtiquetaGridsearchModule} from '../../modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-gridsearch/cdk-modalidade-etiqueta-gridsearch.module';


@NgModule({
    declarations: [CdkModalidadeAcaoEtiquetaFormComponent],
    exports: [
        CdkModalidadeAcaoEtiquetaFormComponent
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
        CdkModalidadeAcaoEtiquetaGridsearchModule,
        MatIconModule,
        MatTooltipModule,
        CdkModalidadeEtiquetaAutocompleteModule,
        CdkModalidadeEtiquetaGridsearchModule,
    ]
})
export class CdkModalidadeAcaoEtiquetaFormModule { }
