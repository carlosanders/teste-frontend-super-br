import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkModeloFormComponent} from './cdk-modelo-form.component';
import {CdkTemplateAutocompleteModule} from '../../template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkTemplateGridsearchModule} from '../../template/cdk-template-autocomplete/cdk-template-gridsearch/cdk-template-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';

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
    ],
    providers: [],
    exports: [
        CdkModeloFormComponent
    ]
})
export class CdkModeloFormModule {
}
