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
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaFilterComponent} from './cdk-juntada-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkDocumentoAvulsoAutocompleteModule} from '../../../documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkVolumeAutocompleteModule} from '../../../volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkTarefaAutocompleteModule} from '../../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkAtividadeAutocompleteModule} from '../../../atividade/cdk-atividade-autocomplete/cdk-atividade-autocomplete.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        CdkJuntadaFilterComponent,
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
        CdkDocumentoAutocompleteModule,
        CdkVolumeAutocompleteModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkAtividadeAutocompleteModule,
        CdkTarefaAutocompleteModule,
        CdkTipoDocumentoAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
        MatButtonToggleModule,
    ],
    providers: [
        JuntadaService,
    ],
    exports: [
        CdkJuntadaFilterComponent
    ]
})
export class CdkJuntadaFilterModule {
}
