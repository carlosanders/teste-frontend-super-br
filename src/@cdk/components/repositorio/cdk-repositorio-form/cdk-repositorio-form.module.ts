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
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRepositorioFormComponent} from './cdk-repositorio-form.component';
import {CdkModalidadeRepositorioAutocompleteModule} from '../../modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-autocomplete.module';
import {CdkModalidadeRepositorioGridsearchModule} from '../../modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-gridsearch/cdk-modalidade-repositorio-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';

@NgModule({
    declarations: [
        CdkRepositorioFormComponent,
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

        CdkModalidadeRepositorioAutocompleteModule,
        CdkModalidadeRepositorioGridsearchModule,

        CdkSharedModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
    ],
    providers: [],
    exports: [
        CdkRepositorioFormComponent
    ]
})
export class CdkRepositorioFormModule {
}
