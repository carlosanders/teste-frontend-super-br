import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkClassificacaoTreeFormComponent} from './cdk-classificacao-tree-form.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkClassificacaoTreeFormService} from './services/cdk-classificacao-tree-form.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkClassificacaoAutocompleteModule} from '../cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {CdkClassificacaoFormModule} from '../cdk-classificacao-form/cdk-classificacao-form.module';
import {CdkModalidadeDestinacaoAutocompleteModule} from '../../modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import {CdkModalidadeDestinacaoGridsearchModule} from '../../modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-gridsearch/cdk-modalidade-destinacao-gridsearch.module';
import {CdkClassificacaoGridsearchModule} from '../cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';


@NgModule({
    declarations: [CdkClassificacaoTreeFormComponent],
    exports: [
        CdkClassificacaoTreeFormComponent
    ],
    imports: [
        CommonModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatTooltipModule,
        MatTreeModule,
        CdkClassificacaoFormModule,
        MatAutocompleteModule,
        CdkClassificacaoAutocompleteModule,
        CdkModalidadeDestinacaoAutocompleteModule,
        CdkModalidadeDestinacaoGridsearchModule,
        CdkClassificacaoGridsearchModule,
        CdkLogentryGridsearchModule,
        MatExpansionModule
    ],
    providers: [
        CdkClassificacaoTreeFormService
    ]
})
export class CdkClassificacaoTreeFormModule {
}
