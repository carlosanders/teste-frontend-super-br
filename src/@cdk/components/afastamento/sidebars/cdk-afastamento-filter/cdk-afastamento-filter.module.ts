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
import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {CdkAfastamentoFilterComponent} from './cdk-afastamento-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeAfastamentoAutocompleteModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-autocomplete.module';
import {CdkColaboradorAutocompleteModule} from '@cdk/components/colaborador/cdk-colaborador-autocomplete/cdk-colaborador-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkAfastamentoFilterComponent,
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
        CdkModalidadeAfastamentoAutocompleteModule,
        CdkColaboradorAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkAfastamentoFilterComponent
    ]
})
export class CdkAfastamentoFilterModule {
}
