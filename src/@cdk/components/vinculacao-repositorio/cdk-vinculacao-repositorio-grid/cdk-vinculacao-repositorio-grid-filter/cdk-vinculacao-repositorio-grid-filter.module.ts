import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioGridFilterComponent} from './cdk-vinculacao-repositorio-grid-filter.component';
import {CdkRepositorioAutocompleteModule} from '../../../repositorio/cdk-repositorio-autocomplete/cdk-repositorio-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEspecieSetorAutocompleteModule} from '../../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioGridFilterComponent,
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
        CdkRepositorioAutocompleteModule,
        CdkEspecieSetorAutocompleteModule,
        CdkSetorAutocompleteModule,
    ],
    providers: [
        VinculacaoRepositorioService,
    ],
    exports: [
        CdkVinculacaoRepositorioGridFilterComponent
    ]
})
export class CdkVinculacaoRepositorioGridFilterModule {
}
