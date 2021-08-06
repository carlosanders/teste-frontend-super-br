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
import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {CdkRelatorioFormComponent} from './cdk-relatorio-form.component';
import {CdkEspecieRelatorioAutocompleteModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import {CdkEspecieRelatorioGridsearchModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-gridsearch/cdk-especie-relatorio-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkEspecieProcessoAutocompleteModule} from "../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module";
import {CdkProcessoGridsearchModule} from "../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module";
import {ProcessoService} from "../../../services/processo.service";
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkProcessoGridModule} from '../../processo/cdk-processo-grid/cdk-processo-grid.module';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {MatRadioModule} from '@angular/material/radio';
import {CdkTipoRelatorioAutocompleteModule} from '../../tipo-relatorio/cdk-tipo-relatorio-autocomplete/cdk-tipo-relatorio-autocomplete.module';
import {CdkTipoRelatorioGridsearchModule} from '../../tipo-relatorio/cdk-tipo-relatorio-autocomplete/cdk-tipo-relatorio-gridsearch/cdk-tipo-relatorio-gridsearch.module';
import {MatSelectModule} from '@angular/material/select';
import {CdkGeneroSetorAutocompleteModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkGeneroRelatorioAutocompleteModule} from '../../genero-relatorio/cdk-genero-relatorio-autocomplete/cdk-genero-relatorio-autocomplete.module';
import {CdkGeneroRelatorioGridsearchModule} from '../../genero-relatorio/cdk-genero-relatorio-autocomplete/cdk-genero-relatorio-gridsearch/cdk-genero-relatorio-gridsearch.module';
import {MatCardModule} from '@angular/material/card';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkProcessoAutocompleteModule} from "../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module";
import {CdkClassificacaoAutocompleteModule} from "../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module";
import {CdkClassificacaoGridsearchModule} from "../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module";
import {CdkClassificacaoGridModule} from "../../classificacao/cdk-classificacao-grid/cdk-classificacao-grid.module";
import {ClassificacaoService} from "../../../services/classificacao.service";

@NgModule({
    declarations: [
        CdkRelatorioFormComponent,
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

        CdkEspecieRelatorioAutocompleteModule,
        CdkEspecieRelatorioGridsearchModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkTipoRelatorioAutocompleteModule,
        CdkTipoRelatorioGridsearchModule,
        CdkProcessoGridModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkClassificacaoAutocompleteModule,
        CdkClassificacaoGridsearchModule,
        CdkClassificacaoGridModule,

        CdkSharedModule,
        MatRadioModule,
        MatSelectModule,
        CdkGeneroSetorAutocompleteModule,
        CdkGeneroRelatorioAutocompleteModule,
        CdkGeneroRelatorioGridsearchModule,
        MatCardModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        MatRadioModule,
        CdkProcessoAutocompleteModule,
        CdkClassificacaoAutocompleteModule,
    ],
    providers: [
        EspecieRelatorioService,
        UsuarioService,
        LoginService,
        ProcessoService,
        ClassificacaoService
    ],
    exports: [
        CdkRelatorioFormComponent
    ]
})
export class CdkRelatorioFormModule {
}
