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
import {UsuarioService} from '@cdk/services/usuario.service';
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
    ],
    providers: [
        EspecieRelatorioService,
        UsuarioService,
        LoginService
    ],
    exports: [
        CdkRelatorioFormComponent
    ]
})
export class CdkRelatorioFormModule {
}
