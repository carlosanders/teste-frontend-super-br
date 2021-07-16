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
import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {CdkRelatorioFilterComponent} from './cdk-relatorio-filter.component';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEspecieRelatorioAutocompleteModule} from '../../../especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkGeneroRelatorioAutocompleteModule} from '../../../genero-relatorio/cdk-genero-relatorio-autocomplete/cdk-genero-relatorio-autocomplete.module';
import {CdkTipoRelatorioAutocompleteModule} from '../../../tipo-relatorio/cdk-tipo-relatorio-autocomplete/cdk-tipo-relatorio-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkRelatorioFilterComponent,
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
        CdkProcessoAutocompleteModule,
        CdkEspecieRelatorioAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkGeneroRelatorioAutocompleteModule,
        CdkTipoRelatorioAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        EspecieRelatorioService,
    ],
    exports: [
        CdkRelatorioFilterComponent
    ]
})
export class CdkRelatorioFilterModule {
}
