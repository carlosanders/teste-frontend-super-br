import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteGridFilterComponent} from './cdk-representante-grid-filter.component';
import {CdkInteressadoAutocompleteModule} from '../../../interessado/cdk-interessado-autocomplete/cdk-interessado-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkModalidadeRepresentanteAutocompleteModule} from '../../../modalidade-representante/cdk-modalidade-representante-autocomplete/cdk-modalidade-representante-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';

@NgModule({
    declarations: [
        CdkRepresentanteGridFilterComponent,
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
        CdkModalidadeRepresentanteAutocompleteModule,
        CdkInteressadoAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
    ],
    providers: [
        RepresentanteService,
    ],
    exports: [
        CdkRepresentanteGridFilterComponent
    ]
})
export class CdkRepresentanteGridFilterModule {
}
