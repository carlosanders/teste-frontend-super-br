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

import { FuseSharedModule } from '@fuse/shared.module';
import { GarantiaAdministrativoService } from '@cdk/services/garantia-administrativo.service';
import {CdkGarantiaAdministrativoAutocompleteModule} from '@cdk/components/garantia-administrativo/cdk-garantia-administrativo-autocomplete/cdk-garantia-administrativo-autocomplete.module';
import {CdkGarantiaGridFilterComponent} from './cdk-garantia-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';

@NgModule({
    declarations: [
        CdkGarantiaGridFilterComponent,
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
        CdkProcessoAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
    ],
    providers: [
        GarantiaAdministrativoService,
    ],
    exports: [
        CdkGarantiaGridFilterComponent
    ]
})
export class CdkGarantiaGridFilterModule {
}
