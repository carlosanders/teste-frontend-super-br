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
import {CdkContaEmailFilterComponent} from './cdk-conta-email-filter.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {ContaEmailService} from '../../../../services/conta-email.service';
import {CdkServidorEmailAutocompleteModule} from '../../../servidor-email/cdk-servidor-email-autocomplete/cdk-servidor-email-autocomplete.module';

@NgModule({
    declarations: [
        CdkContaEmailFilterComponent,
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

        CdkUsuarioAutocompleteModule,
        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
        CdkServidorEmailAutocompleteModule
    ],
    providers: [
        ContaEmailService,
    ],
    exports: [
        CdkContaEmailFilterComponent
    ]
})
export class CdkContaEmailFilterModule {
}
