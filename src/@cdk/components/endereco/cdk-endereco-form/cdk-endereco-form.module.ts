import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { MunicipioService } from '@cdk/services/municipio.service';
import { CdkEnderecoFormComponent } from './cdk-endereco-form.component';
import { CdkMunicipioAutocompleteModule } from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import { CdkMunicipioGridsearchModule } from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';
import {CdkPaisAutocompleteModule} from '../../pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkPaisGridsearchModule} from '../../pais/cdk-pais-autocomplete/cdk-pais-gridsearch/cdk-pais-gridsearch.module';
import {PaisService} from '../../../services/pais.service';

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

        FuseSharedModule,
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
