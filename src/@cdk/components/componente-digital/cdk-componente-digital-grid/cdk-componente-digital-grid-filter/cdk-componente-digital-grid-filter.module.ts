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
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalGridFilterComponent} from './cdk-componente-digital-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeAlvoInibidorAutocompleteModule} from '../../../modalidade-alvo-inibidor/cdk-modalidade-alvo-inibidor-autocomplete/cdk-modalidade-alvo-inibidor-autocomplete.module';
import {CdkModalidadeTipoInibidorAutocompleteModule} from '../../../modalidade-tipo-inibidor/cdk-modalidade-tipo-inibidor-autocomplete/cdk-modalidade-tipo-inibidor-autocomplete.module';
import {CdkModeloAutocompleteModule} from '../../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkDocumentoAvulsoAutocompleteModule} from '../../../documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkTarefaAutocompleteModule} from '../../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridFilterComponent,
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
        CdkModalidadeAlvoInibidorAutocompleteModule,
        CdkModalidadeTipoInibidorAutocompleteModule,
        CdkModeloAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkTarefaAutocompleteModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
        CdkProcessoAutocompleteModule,
    ],
    providers: [
        ComponenteDigitalService,
    ],
    exports: [
        CdkComponenteDigitalGridFilterComponent
    ]
})
export class CdkComponenteDigitalGridFilterModule {
}
