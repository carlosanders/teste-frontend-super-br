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
import {CdkAssinaturaGridFilterComponent} from './cdk-assinatura-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkComponenteDigitalAutocompleteModule} from '@cdk/components/componente-digital/cdk-componente-digital-autocomplete/cdk-componente-digital-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '@cdk/components/origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';

@NgModule({
    declarations: [
        CdkAssinaturaGridFilterComponent,
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
        CdkComponenteDigitalAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
    ],
    providers: [],
    exports: [
        CdkAssinaturaGridFilterComponent
    ]
})
export class CdkAssinaturaGridFilterModule {
}
