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
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkTipoValidacaoSetorOrgComponent} from './cdk-tipo-validacao-setor-org.component';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';

@NgModule({
    declarations: [
        CdkTipoValidacaoSetorOrgComponent,
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
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkTipoValidacaoSetorOrgComponent
    ]
})
export class CdkTipoValidacaoSetorOrgModule {
}
