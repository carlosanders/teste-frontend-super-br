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
import {CdkEspecieDocumentoFilterComponent} from './cdk-especie-documento-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGeneroDocumentoAutocompleteModule} from '../../../genero-documento/cdk-genero-documento-autocomplete/cdk-genero-documento-autocomplete.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoFilterComponent,
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
        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        EspecieDocumentoService,
    ],
    exports: [
        CdkEspecieDocumentoFilterComponent
    ]
})
export class CdkEspecieDocumentoFilterModule {
}
