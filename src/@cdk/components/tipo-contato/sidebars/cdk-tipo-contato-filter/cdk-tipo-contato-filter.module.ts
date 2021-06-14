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
import {CdkTipoContatoFilterComponent} from './cdk-tipo-contato-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {TipoContatoService} from '../../../../services/tipo-contato.service';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        CdkTipoContatoFilterComponent,
    ],
    imports: [
        FormsModule,
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
    ],
    providers: [
        TipoContatoService,
    ],
    exports: [
        CdkTipoContatoFilterComponent
    ]
})
export class CdkTipoContatoFilterModule {
}
