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

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkNumeroUnicoDocumentoGridFilterComponent} from './cdk-numero-unico-documento-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from "@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module";
import {CdkTipoDocumentoAutocompleteModule} from "@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module";
import {NumeroUnicoDocumentoService} from "@cdk/services/numero-unico-documento.service";

@NgModule({
    declarations: [
        CdkNumeroUnicoDocumentoGridFilterComponent,
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
        CdkTipoDocumentoAutocompleteModule,
        CdkSetorAutocompleteModule,
    ],
    providers: [
        NumeroUnicoDocumentoService,
    ],
    exports: [
        CdkNumeroUnicoDocumentoGridFilterComponent
    ]
})
export class CdkNumeroUnicoDocumentoGridFilterModule {
}
