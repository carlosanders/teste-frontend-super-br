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
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloFilterComponent} from './cdk-vinculacao-modelo-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEspecieSetorAutocompleteModule} from '../../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkModeloAutocompleteModule} from '../../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkModalidadeOrgaoCentralAutocompleteModule} from '../../../modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoModeloFilterComponent,
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

        CdkUsuarioAutocompleteModule,
        CdkModeloAutocompleteModule,
        CdkEspecieSetorAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkModalidadeOrgaoCentralAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        VinculacaoModeloService,
    ],
    exports: [
        CdkVinculacaoModeloFilterComponent
    ]
})
export class CdkVinculacaoModeloFilterModule {
}
