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

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaGridFilterComponent} from './cdk-vinculacao-etiqueta-grid-filter.component';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkEtiquetaAutocompleteModule} from '../../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkTarefaAutocompleteModule} from '../../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaGridFilterComponent,
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
        CdkEtiquetaAutocompleteModule,
        CdkTarefaAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkProcessoAutocompleteModule,
    ],
    providers: [
        VinculacaoEtiquetaService,
    ],
    exports: [
        CdkVinculacaoEtiquetaGridFilterComponent
    ]
})
export class CdkVinculacaoEtiquetaGridFilterModule {
}
