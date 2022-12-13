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
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {CdkCriteriaFormComponent} from './cdk-criteria-form.component';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkAssuntoAdministrativoGridTreeModule} from "../../assunto-administrativo/cdk-assunto-administrativo-grid-tree/cdk-assunto-administrativo-grid-tree.module";
import {CdkAssuntoAdministrativoGridsearchModule} from "../../assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-gridsearch/cdk-assunto-administrativo-gridsearch.module";
import {CdkAssuntoAdministrativoAutocompleteModule} from "../../assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module";
import { CdkAssuntoAdministrativoGridTreeService} from "../../assunto-administrativo/cdk-assunto-administrativo-grid-tree/services/cdk-assunto-administrativo-grid-tree.service";

@NgModule({
    declarations: [
        CdkCriteriaFormComponent,
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
        MatRadioModule,
        MatTooltipModule,

        CdkSharedModule,
        CdkSetorAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        MatSlideToggleModule,
        CdkSetorGridsearchModule,
        CdkUsuarioGridsearchModule,
        MatSelectModule,
        NgxUpperCaseDirectiveModule,
        CdkAssuntoAdministrativoGridTreeModule,
        CdkAssuntoAdministrativoGridsearchModule,
        CdkAssuntoAdministrativoAutocompleteModule,
    ],
    providers: [
        RegraEtiquetaService,
        CdkAssuntoAdministrativoGridTreeService
    ],
    exports: [
        CdkCriteriaFormComponent
    ]
})
export class CdkCriteriaFormModule {
}
