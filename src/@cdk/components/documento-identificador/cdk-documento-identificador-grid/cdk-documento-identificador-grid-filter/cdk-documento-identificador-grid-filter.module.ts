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

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkDocumentoIdentificadorGridFilterComponent } from './cdk-documento-identificador-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkPessoaAutocompleteModule} from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkModalidadeDocumentoIdentificadorAutocompleteModule} from '../../../modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-autocomplete.module';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridFilterComponent,
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
        CdkModalidadeDocumentoIdentificadorAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
        CdkPessoaAutocompleteModule,
    ],
    providers: [

    ],
    exports: [
        CdkDocumentoIdentificadorGridFilterComponent
    ]
})
export class CdkDocumentoIdentificadorGridFilterModule {
}
