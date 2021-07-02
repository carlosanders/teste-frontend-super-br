import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaBarramentoFilterComponent} from './cdk-vinculacao-pessoa-barramento-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {VinculacaoPessoaBarramentoService} from "../../../../services/vinculacao-pessoa-barramento.service";
import {CdkPessoaAutocompleteModule} from "../../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module";
import {CdkUsuarioAutocompleteModule} from "../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module";
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoPessoaBarramentoFilterComponent,
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

        CdkSharedModule,

        CdkPessoaAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService,
    ],
    exports: [
        CdkVinculacaoPessoaBarramentoFilterComponent
    ]
})
export class CdkVinculacaoPessoaBarramentoFilterModule {
}
