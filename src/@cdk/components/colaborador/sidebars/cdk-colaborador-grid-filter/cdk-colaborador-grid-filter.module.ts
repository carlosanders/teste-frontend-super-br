import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {CdkColaboradorGridFilterComponent} from './cdk-colaborador-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkCargoAutocompleteModule} from '@cdk/components/cargo/cdk-cargo-autocomplete/cdk-cargo-autocomplete.module';
import {CdkModalidadeColaboradorAutocompleteModule} from '@cdk/components/modalidade-colaborador/cdk-modalidade-colaborador-autocomplete/cdk-modalidade-colaborador-autocomplete.module';

@NgModule({
    declarations: [
        CdkColaboradorGridFilterComponent,
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

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkCargoAutocompleteModule,
        CdkModalidadeColaboradorAutocompleteModule,
    ],
    providers: [
        ModalidadeColaboradorService,
    ],
    exports: [
        CdkColaboradorGridFilterComponent
    ]
})
export class CdkColaboradorGridFilterModule {
}
