import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';
import {CdkEspecieSetorGridFilterComponent} from './cdk-especie-setor-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGeneroSetorAutocompleteModule} from '../../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieSetorGridFilterComponent,
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

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkGeneroSetorAutocompleteModule,
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkEspecieSetorGridFilterComponent
    ]
})
export class CdkEspecieSetorGridFilterModule {
}
