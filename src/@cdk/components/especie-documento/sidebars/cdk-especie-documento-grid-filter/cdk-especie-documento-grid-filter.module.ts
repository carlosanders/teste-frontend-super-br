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
import {EspecieDocumentoService} from '@cdk/services/especie-documento.service';
import {CdkEspecieDocumentoGridFilterComponent} from './cdk-especie-documento-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGeneroDocumentoAutocompleteModule} from '../../../genero-documento/cdk-genero-documento-autocomplete/cdk-genero-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoGridFilterComponent,
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

        CdkGeneroDocumentoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
    ],
    providers: [
        EspecieDocumentoService,
    ],
    exports: [
        CdkEspecieDocumentoGridFilterComponent
    ]
})
export class CdkEspecieDocumentoGridFilterModule {
}
