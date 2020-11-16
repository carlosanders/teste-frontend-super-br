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
    MatRadioModule,
    MatTooltipModule,
    MatSelectModule,
    MatSlideToggleModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {RegraService} from '@cdk/services/regra.service';
import {CdkCriteriaFormComponent} from './cdk-criteria-form.component';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';

@NgModule({
    declarations: [
        CdkCriteriaFormComponent,
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
        MatRadioModule,
        MatTooltipModule,

        CdkSharedModule,
        CdkSetorAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        MatSlideToggleModule,
        CdkSetorGridsearchModule,
        CdkUsuarioGridsearchModule,
        MatSelectModule,
    ],
    providers: [
        RegraService
    ],
    exports: [
        CdkCriteriaFormComponent
    ]
})
export class CdkCriteriaFormModule {
}
