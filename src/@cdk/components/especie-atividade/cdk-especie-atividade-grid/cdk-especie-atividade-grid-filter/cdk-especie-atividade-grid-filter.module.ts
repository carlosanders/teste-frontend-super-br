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
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeGridFilterComponent} from './cdk-especie-atividade-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkGeneroAtividadeAutocompleteModule} from '../../../genero-atividade/cdk-genero-atividade-autocomplete/cdk-genero-atividade-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridFilterComponent,
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
        CdkGeneroAtividadeAutocompleteModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkEspecieAtividadeGridFilterComponent
    ]
})
export class CdkEspecieAtividadeGridFilterModule {
}
