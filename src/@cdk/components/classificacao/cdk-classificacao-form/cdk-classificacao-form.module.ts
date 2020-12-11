import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {CdkClassificacaoFormComponent} from './cdk-classificacao-form.component';
import {CdkModalidadeDestinacaoAutocompleteModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import {CdkModalidadeDestinacaoGridsearchModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-gridsearch/cdk-modalidade-destinacao-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {CdkClassificacaoAutocompleteModule} from '../cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoGridsearchModule} from '../cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {CdkTipoSigiloAutocompleteModule} from "../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module";
import {CdkTipoSigiloGridsearchModule} from "../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-gridsearch/cdk-tipo-sigilo-gridsearch.module";

@NgModule({
    declarations: [
        CdkClassificacaoFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatExpansionModule,

        CdkModalidadeDestinacaoAutocompleteModule,
        CdkModalidadeDestinacaoGridsearchModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkClassificacaoAutocompleteModule,
        CdkClassificacaoGridsearchModule,

        CdkSharedModule,
        MatTooltipModule,
        CdkLogentryGridsearchModule,
        CdkTipoSigiloAutocompleteModule,
        CdkTipoSigiloGridsearchModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
        ClassificacaoService
    ],
    exports: [
        CdkClassificacaoFormComponent
    ]
})
export class CdkClassificacaoFormModule {
}
