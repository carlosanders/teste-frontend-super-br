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
import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {CdkModalidadeDocumentoIdentificadorGridFilterComponent} from './cdk-modalidade-documento-identificador-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridFilterComponent,
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
    ],
    providers: [
        ModalidadeDocumentoIdentificadorService,
    ],
    exports: [
        CdkModalidadeDocumentoIdentificadorGridFilterComponent
    ]
})
export class CdkModalidadeDocumentoIdentificadorGridFilterModule {
}
