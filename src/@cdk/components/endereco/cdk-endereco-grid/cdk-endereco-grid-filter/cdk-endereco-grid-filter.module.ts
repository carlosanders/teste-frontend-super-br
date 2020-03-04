import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkEnderecoGridFilterComponent} from './cdk-endereco-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkPessoaAutocompleteModule} from '../../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPaisAutocompleteModule} from '../../../pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';

@NgModule({
    declarations: [
        CdkEnderecoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkMunicipioAutocompleteModule,
        CdkPaisAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
        CdkPessoaAutocompleteModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkEnderecoGridFilterComponent
    ]
})
export class CdkEnderecoGridFilterModule {
}
