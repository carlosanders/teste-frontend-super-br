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
    MatExpansionModule

} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { ModalidadeColaboradorService } from '@cdk/services/modalidade-colaborador.service';
import { CdkColaboradorFormComponent } from './cdk-colaborador-form.component';
import { CdkModalidadeColaboradorAutocompleteModule } from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-autocomplete.module';
import { CdkModalidadeColaboradorGridsearchModule } from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-gridsearch/cdk-modalidade-colaborador-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkCargoAutocompleteModule} from '@cdk/components/cargo/cdk-cargo-autocomplete/cdk-cargo-autocomplete.module';
import {CdkCargoGridsearchModule} from '@cdk/components/cargo/cdk-cargo-autocomplete/cdk-cargo-gridsearch/cdk-cargo-gridsearch.module';

@NgModule({
    declarations: [
        CdkColaboradorFormComponent,
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

        CdkModalidadeColaboradorAutocompleteModule,
        CdkModalidadeColaboradorGridsearchModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkCargoAutocompleteModule,
        CdkCargoGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeColaboradorService,
        ColaboradorService
    ],
    exports: [
        CdkColaboradorFormComponent
    ]
})
export class CdkColaboradorFormModule {
}
