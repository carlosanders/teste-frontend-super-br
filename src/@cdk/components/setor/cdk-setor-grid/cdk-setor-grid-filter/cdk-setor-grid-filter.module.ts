import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { SetorService } from '@cdk/services/setor.service';
import { CdkSetorGridFilterComponent } from './cdk-setor-grid-filter.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeOrgaoCentralAutocompleteModule} from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {CdkGeneroSetorAutocompleteModule} from '@cdk/components/genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkEspecieSetorAutocompleteModule} from '@cdk/components/especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkSetorAutocompleteComponent} from '../../cdk-setor-autocomplete/cdk-setor-autocomplete.component';

@NgModule({
    declarations: [
        CdkSetorGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        FuseSharedModule,

        CdkSetorAutocompleteModule,
        CdkMunicipioAutocompleteModule,
        CdkGeneroSetorAutocompleteModule,
        CdkEspecieSetorAutocompleteModule,
        CdkModalidadeOrgaoCentralAutocompleteModule,
        CdkUsuarioAutocompleteModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorGridFilterComponent
    ]
})
export class CdkSetorGridFilterModule {
}
