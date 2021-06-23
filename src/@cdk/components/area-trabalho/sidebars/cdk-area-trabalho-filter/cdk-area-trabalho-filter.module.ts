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
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkAreaTrabalhoFilterComponent} from './cdk-area-trabalho-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkAreaTrabalhoFilterComponent,
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
        CdkDocumentoAutocompleteModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkAreaTrabalhoFilterComponent
    ]
})
export class CdkAreaTrabalhoFilterModule {
}
