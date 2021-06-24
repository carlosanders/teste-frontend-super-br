import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEspecieRelatorioFilterComponent} from './cdk-especie-relatorio-filter.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';
import {CdkGeneroRelatorioAutocompleteModule} from '../../../genero-relatorio/cdk-genero-relatorio-autocomplete/cdk-genero-relatorio-autocomplete.module';
import {EspecieRelatorioService} from '../../../../services/especie-relatorio.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkEspecieRelatorioFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatetimepickerModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkGeneroRelatorioAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkGeneroRelatorioAutocompleteModule,
        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        EspecieRelatorioService,
    ],
    exports: [
        CdkEspecieRelatorioFilterComponent
    ]
})
export class CdkEspecieRelatorioFilterModule {
}
