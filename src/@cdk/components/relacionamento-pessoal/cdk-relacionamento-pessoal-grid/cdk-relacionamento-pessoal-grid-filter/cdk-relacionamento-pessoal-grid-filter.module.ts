import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridFilterComponent} from './cdk-relacionamento-pessoal-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkPessoaAutocompleteModule} from '../../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeRelacionamentoPessoalAutocompleteModule} from '../../../modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-autocomplete/cdk-modalidade-relacionamento-pessoal-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridFilterComponent,
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

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkPessoaAutocompleteModule,
        CdkModalidadeRelacionamentoPessoalAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
    ],
    providers: [
        RelacionamentoPessoalService,
    ],
    exports: [
        CdkRelacionamentoPessoalGridFilterComponent
    ]
})
export class CdkRelacionamentoPessoalGridFilterModule {
}
