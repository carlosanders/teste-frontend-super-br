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
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {CdkEspecieDocumentoAvulsoGridFilterComponent} from './cdk-especie-documento-avulso-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGeneroDocumentoAvulsoAutocompleteModule} from '@cdk/components/genero-documento-avulso/cdk-genero-documento-avulso-autocomplete/cdk-genero-documento-avulso-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoGridFilterComponent,
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
        CdkGeneroDocumentoAvulsoAutocompleteModule,
    ],
    providers: [
        EspecieDocumentoAvulsoService,
    ],
    exports: [
        CdkEspecieDocumentoAvulsoGridFilterComponent
    ]
})
export class CdkEspecieDocumentoAvulsoGridFilterModule {
}
