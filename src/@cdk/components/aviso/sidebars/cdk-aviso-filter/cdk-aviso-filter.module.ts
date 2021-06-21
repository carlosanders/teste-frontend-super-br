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
import {CdkAvisoFilterComponent} from './cdk-aviso-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import { CdkSetorAutocompleteModule } from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import { CdkModalidadeOrgaoCentralAutocompleteModule } from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        CdkAvisoFilterComponent,
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
        CdkModalidadeOrgaoCentralAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
        MatButtonToggleModule,
    ],
    providers: [

    ],
    exports: [
        CdkAvisoFilterComponent
    ]
})
export class CdkAvisoFilterModule {
}
