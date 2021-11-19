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
import {CdkModalidadeCopiaFilterComponent} from './cdk-modalidade-copia-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {ModalidadeCopiaService} from '../../../../services/modalidade-copia.service';
import {CdkUsuarioAutocompleteModule} from "../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module";

@NgModule({
    declarations: [
        CdkModalidadeCopiaFilterComponent,
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
        CdkUsuarioAutocompleteModule,

        CdkSharedModule,

        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        ModalidadeCopiaService,
    ],
    exports: [
        CdkModalidadeCopiaFilterComponent
    ]
})
export class CdkModalidadeCopiaFilterModule {
}
