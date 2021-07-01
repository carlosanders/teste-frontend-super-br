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
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {CdkRegraEtiquetaFilterComponent} from './cdk-regra-etiqueta-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEtiquetaAutocompleteModule} from '../../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkRegraEtiquetaFilterComponent,
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
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        RegraEtiquetaService,
    ],
    exports: [
        CdkRegraEtiquetaFilterComponent
    ]
})
export class CdkRegraEtiquetaFilterModule {
}
