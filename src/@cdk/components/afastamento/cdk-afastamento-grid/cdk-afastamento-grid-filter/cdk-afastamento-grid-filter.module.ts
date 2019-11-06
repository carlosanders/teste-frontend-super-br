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

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAfastamentoService } from '@cdk/services/modalidade-afastamento.service';
import { CdkAfastamentoGridFilterComponent } from './cdk-afastamento-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeAfastamentoAutocompleteModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-autocomplete.module';
import {CdkColaboradorAutocompleteModule} from '@cdk/components/colaborador/cdk-colaborador-autocomplete/cdk-colaborador-autocomplete.module';

@NgModule({
    declarations: [
        CdkAfastamentoGridFilterComponent,
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
        CdkModalidadeAfastamentoAutocompleteModule,
        CdkColaboradorAutocompleteModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkAfastamentoGridFilterComponent
    ]
})
export class CdkAfastamentoGridFilterModule {
}
