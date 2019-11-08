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
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridFilterComponent} from './cdk-sigilo-grid-filter.component';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '@cdk/components/modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '@cdk/components/documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '@cdk/components/origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkTipoSigiloAutocompleteModule} from '@cdk/components/tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';

@NgModule({
    declarations: [
        CdkSigiloGridFilterComponent,
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
        CdkModalidadeCategoriaSigiloAutocompleteModule,
        CdkTipoSigiloAutocompleteModule,
        CdkProcessoAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloGridFilterComponent
    ]
})
export class CdkSigiloGridFilterModule {
}
