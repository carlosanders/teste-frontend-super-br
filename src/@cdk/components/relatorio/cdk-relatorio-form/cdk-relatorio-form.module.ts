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
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {ProcessoService} from '@cdk/services/processo.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkProcessoGridModule} from '../../processo/cdk-processo-grid/cdk-processo-grid.module';
import {FavoritoService} from '@cdk/services/favorito.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {CdkLogentryGridModule} from '@cdk/components/logentry/cdk-logentry-grid/cdk-logentry-grid.module';
import {CdkLogentryGridsearchModule} from '@cdk/components/logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {MatRadioModule} from "@angular/material/radio";
import {CdkTipoRelatorioAutocompleteModule} from "../cdk-tipo-relatorio-autocomplete/cdk-tipo-relatorio-autocomplete.module";
import {CdkTipoRelatorioGridsearchModule} from "../cdk-tipo-relatorio-autocomplete/cdk-tipo-relatorio-gridsearch/cdk-tipo-relatorio-gridsearch.module";

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
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkTipoRelatorioAutocompleteModule,
        CdkTipoRelatorioGridsearchModule,
        CdkProcessoGridModule,

        CdkLogentryGridModule,
        CdkLogentryGridsearchModule,

        CdkSharedModule,
        MatRadioModule,
    ],
    providers: [
        EspecieRelatorioService,
        UsuarioService,
        ProcessoService,
        FavoritoService,
        LoginService
    ],
    exports: [
        CdkRelatorioFormComponent
    ]
})
export class CdkRelatorioFormModule {
}
