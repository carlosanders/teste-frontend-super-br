import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkEnderecoFormComponent} from './cdk-endereco-form.component';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridsearchModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';
import {CdkPaisAutocompleteModule} from '../../pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkPaisGridsearchModule} from '../../pais/cdk-pais-autocomplete/cdk-pais-gridsearch/cdk-pais-gridsearch.module';
import {PaisService} from '@cdk/services/pais.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkEnderecoFormComponent,
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

        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridsearchModule,
        CdkPaisAutocompleteModule,
        CdkPaisGridsearchModule,

        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [
        MunicipioService,
        PaisService
    ],
    exports: [
        CdkEnderecoFormComponent
    ]
})
export class CdkEnderecoFormModule {
}
