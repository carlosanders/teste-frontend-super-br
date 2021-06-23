import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSigiloFormComponent} from './cdk-sigilo-form.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '../../modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkTipoSigiloAutocompleteModule} from '../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';
import {CdkModalidadeCategoriaSigiloGridsearchModule} from '../../modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-gridsearch/cdk-modalidade-categoria-sigilo-gridsearch.module';
import {CdkTipoSigiloGridsearchModule} from '../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-gridsearch/cdk-tipo-sigilo-gridsearch.module';
import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';

@NgModule({
    declarations: [
        CdkSigiloFormComponent,
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
        MatSlideToggleModule,
        MatTooltipModule,

        NgxUpperCaseDirectiveModule,

        CdkModalidadeCategoriaSigiloAutocompleteModule,
        CdkModalidadeCategoriaSigiloGridsearchModule,
        CdkTipoSigiloAutocompleteModule,
        CdkTipoSigiloGridsearchModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
    ],
    providers: [
        ProcessoService,
        ModalidadeCategoriaSigiloService,
        TipoSigiloService,
        DocumentoService,
        OrigemDadosService
    ],
    exports: [
        CdkSigiloFormComponent
    ]
})
export class CdkSigiloFormModule {
}
