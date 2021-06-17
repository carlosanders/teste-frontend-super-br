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
import {CdkContatoFilterComponent} from './cdk-contato-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {ContatoService} from '../../../../services/contato.service';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkTipoContatoAutocompleteModule} from '../../../tipo-contato/cdk-tipo-contato-autocomplete/cdk-tipo-contato-autocomplete.module';

@NgModule({
    declarations: [
        CdkContatoFilterComponent,
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
        CdkTipoContatoAutocompleteModule,
    ],
    providers: [
        ContatoService,
    ],
    exports: [
        CdkContatoFilterComponent
    ]
})
export class CdkContatoFilterModule {
}
