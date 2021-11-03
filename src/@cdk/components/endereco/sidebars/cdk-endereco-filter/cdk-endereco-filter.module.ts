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
import {CdkEnderecoFilterComponent} from './cdk-endereco-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkPessoaAutocompleteModule} from '../../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPaisAutocompleteModule} from '../../../pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkEnderecoFilterComponent,
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
        CdkPessoaAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkEnderecoFilterComponent
    ]
})
export class CdkEnderecoFilterModule {
}
