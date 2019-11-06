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
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridFilterComponent} from './cdk-feriado-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';

@NgModule({
    declarations: [
        CdkFeriadoGridFilterComponent,
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
        CdkMunicipioAutocompleteModule,
    ],
    providers: [
        FeriadoService,
    ],
    exports: [
        CdkFeriadoGridFilterComponent
    ]
})
export class CdkFeriadoGridFilterModule {
}
