import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {
    CdkModalidadeRepresentanteAutocompleteModule
} from '@cdk/components/modalidade-representante/cdk-modalidade-representante-autocomplete/cdk-modalidade-representante-autocomplete.module';
import {
    CdkModalidadeRepresentanteGridsearchModule
} from '@cdk/components/modalidade-representante/cdk-modalidade-representante-autocomplete/cdk-modalidade-representante-gridsearch/cdk-modalidade-representante-gridsearch.module';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {CdkRepresentanteFormComponent} from './cdk-representante-form.component';

@NgModule({
    declarations: [
        CdkRepresentanteFormComponent,
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
        MatExpansionModule,
        MatTooltipModule,
        CdkModalidadeRepresentanteAutocompleteModule,
        CdkModalidadeRepresentanteGridsearchModule,
        CdkSharedModule,
    ],
    providers: [],
    exports: [
        CdkRepresentanteFormComponent
    ]
})
export class CdkRepresentanteFormModule {
}
