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
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {ModeloService} from '@cdk/services/modelo.service';
import {CdkModeloFilterComponent} from './cdk-modelo-filter.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkModalidadeModeloAutocompleteModule} from '@cdk/components/modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-autocomplete.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {MatRadioModule} from "@angular/material/radio";
import {
    CdkModalidadeOrgaoCentralAutocompleteModule
} from "../../../modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module";
import {CdkSetorAutocompleteModule} from "../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module";

@NgModule({
    declarations: [
        CdkModeloFilterComponent,
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
        CdkModalidadeModeloAutocompleteModule,
        CdkTipoDocumentoAutocompleteModule,
        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
        MatRadioModule,
        CdkModalidadeOrgaoCentralAutocompleteModule,
        CdkSetorAutocompleteModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloFilterComponent
    ]
})
export class CdkModeloFilterModule {
}
