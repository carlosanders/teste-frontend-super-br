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
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {CdkDocumentoAvulsoFormComponent} from './cdk-documento-avulso-form.component';
import {CdkEspecieDocumentoAvulsoAutocompleteModule} from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-autocomplete/cdk-especie-documento-avulso-autocomplete.module';
import {CdkEspecieDocumentoAvulsoGridsearchModule} from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-autocomplete/cdk-especie-documento-avulso-gridsearch/cdk-especie-documento-avulso-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkModeloAutocompleteModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridsearchModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-gridsearch/cdk-modelo-gridsearch.module';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkProcessoGridModule} from '../../processo/cdk-processo-grid/cdk-processo-grid.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {CdkBlocoDestinatarioGridModule} from '../cdk-bloco-destinatario-grid/cdk-bloco-destinatario-grid.module';
import {FavoritoService} from '../../../services/favorito.service';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {CdkPessoaGridsearchModule} from "../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module";

@NgModule({
    declarations: [
        CdkDocumentoAvulsoFormComponent,
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
        MatMomentDatetimeModule,
        MatSlideToggleModule,
        MatTooltipModule,

        NgxUpperCaseDirectiveModule,

        CdkEspecieDocumentoAvulsoAutocompleteModule,
        CdkEspecieDocumentoAvulsoGridsearchModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkModeloAutocompleteModule,
        CdkModeloGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkProcessoGridModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
        CdkBlocoDestinatarioGridModule,
        MatCardModule,
        MatRadioModule,
        MatSelectModule,
        CdkPessoaGridsearchModule,
    ],
    providers: [
        EspecieDocumentoAvulsoService,
        FavoritoService,
        UsuarioService,
        ProcessoService
    ],
    exports: [
        CdkDocumentoAvulsoFormComponent
    ]
})
export class CdkDocumentoAvulsoFormModule {
}
