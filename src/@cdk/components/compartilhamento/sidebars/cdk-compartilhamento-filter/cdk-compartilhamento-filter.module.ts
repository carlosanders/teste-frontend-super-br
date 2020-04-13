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

import { CdkSharedModule } from '@cdk/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkCompartilhamentoFilterComponent} from './cdk-compartilhamento-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkTarefaAutocompleteModule} from '../../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoFilterComponent,
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
        CdkTarefaAutocompleteModule,
        CdkProcessoAutocompleteModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkCompartilhamentoFilterComponent
    ]
})
export class CdkCompartilhamentoFilterModule {
}
