import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GarantiaAdministrativoService} from '@cdk/services/garantia-administrativo.service';
import {CdkGarantiaAdministrativoGridFilterComponent} from './cdk-garantia-administrativo-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGarantiaAdministrativoAutocompleteModule} from '../../cdk-garantia-administrativo-autocomplete/cdk-garantia-administrativo-autocomplete.module';

@NgModule({
    declarations: [
        CdkGarantiaAdministrativoGridFilterComponent,
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

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkGarantiaAdministrativoAutocompleteModule,
    ],
    providers: [
        GarantiaAdministrativoService,
    ],
    exports: [
        CdkGarantiaAdministrativoGridFilterComponent
    ]
})
export class CdkGarantiaAdministrativoGridFilterModule {
}
