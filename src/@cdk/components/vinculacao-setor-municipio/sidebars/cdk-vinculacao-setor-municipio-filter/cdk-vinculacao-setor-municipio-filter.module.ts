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
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {CdkVinculacaoSetorMunicipioFilterComponent} from './cdk-vinculacao-setor-municipio-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';


@NgModule({
    declarations: [
        CdkVinculacaoSetorMunicipioFilterComponent,
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
        CdkSetorAutocompleteModule,
        CdkMunicipioAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        VinculacaoUsuarioService,
    ],
    exports: [
        CdkVinculacaoSetorMunicipioFilterComponent
    ]
})
export class CdkVinculacaoSetorMunicipioFilterModule {
}
