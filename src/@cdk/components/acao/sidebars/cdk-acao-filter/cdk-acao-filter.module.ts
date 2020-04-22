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
import {AcaoService} from '@cdk/services/acao.service';
import {CdkAcaoFilterComponent} from './cdk-acao-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEtiquetaAutocompleteModule} from '../../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';

@NgModule({
    declarations: [
        CdkAcaoFilterComponent,
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
        CdkEtiquetaAutocompleteModule,
    ],
    providers: [
        AcaoService,
    ],
    exports: [
        CdkAcaoFilterComponent
    ]
})
export class CdkAcaoFilterModule {
}
