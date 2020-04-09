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
import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoGridFilterComponent} from './cdk-lotacao-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkColaboradorAutocompleteModule} from '../../../colaborador/cdk-colaborador-autocomplete/cdk-colaborador-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkLotacaoGridFilterComponent,
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
        CdkColaboradorAutocompleteModule,
        CdkSetorAutocompleteModule,
    ],
    providers: [
        LotacaoService,
    ],
    exports: [
        CdkLotacaoGridFilterComponent
    ]
})
export class CdkLotacaoGridFilterModule {
}
