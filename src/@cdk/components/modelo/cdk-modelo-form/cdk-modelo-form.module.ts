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
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkModeloFormComponent} from './cdk-modelo-form.component';
import {CdkTemplateAutocompleteModule} from '../../template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkTemplateGridsearchModule} from '../../template/cdk-template-autocomplete/cdk-template-gridsearch/cdk-template-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkModalidadeModeloAutocompleteModule} from '../../modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-autocomplete.module';
import {CdkModalidadeModeloGridsearchModule} from '../../modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-gridsearch/cdk-modalidade-modelo-gridsearch.module';

@NgModule({
    declarations: [
        CdkModeloFormComponent,
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
        MatTooltipModule,
        NgxUpperCaseDirectiveModule,
        CdkTemplateAutocompleteModule,
        CdkTemplateGridsearchModule,
        CdkSharedModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkModalidadeModeloAutocompleteModule,
        CdkModalidadeModeloGridsearchModule,
    ],
    providers: [],
    exports: [
        CdkModeloFormComponent
    ]
})
export class CdkModeloFormModule {
}
