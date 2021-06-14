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
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkModalidadeModeloAutocompleteModule} from '../../modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-autocomplete.module';
import {CdkModalidadeModeloGridsearchModule} from '../../modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-gridsearch/cdk-modalidade-modelo-gridsearch.module';
import {CdkTemplateFormComponent} from './cdk-template-form.component';
import {CdkModalidadeTemplateAutocompleteModule} from '../../modalidade-template/cdk-modalidade-template-autocomplete/cdk-modalidade-template-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkModalidadeTemplateGridsearchModule} from '../../modalidade-template/cdk-modalidade-template-autocomplete/cdk-modalidade-template-gridsearch/cdk-modalidade-template-gridsearch.module';
import {CdkDocumentoGridsearchModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-gridsearch/cdk-documento-gridsearch.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkTipoDocumentoGridsearchModule} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';

@NgModule({
    declarations: [
        CdkTemplateFormComponent
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
        CdkSharedModule,
        CdkModalidadeModeloAutocompleteModule,
        CdkModalidadeModeloGridsearchModule,
        CdkModalidadeTemplateAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkModalidadeTemplateGridsearchModule,
        CdkDocumentoGridsearchModule,
        CdkTipoDocumentoAutocompleteModule,
        CdkTipoDocumentoGridsearchModule,
    ],
    providers: [],
    exports: [
        CdkTemplateFormComponent
    ]
})
export class CdkTemplateFormModule {
}
