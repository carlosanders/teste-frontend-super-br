import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkCompartilhamentoFormComponent} from './cdk-compartilhamento-form.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {
    CdkModalidadeCompartilhamentoAutocompleteModule
} from "../../modalidade-compartilhamento/cdk-modalidade-compartilhamento-autocomplete/cdk-modalidade-compartilhamento-autocomplete.module";
import {
    CdkModalidadeCompartilhamentoGridsearchModule
} from "../../modalidade-compartilhamento/cdk-modalidade-compartilhamento-autocomplete/cdk-modalidade-compartilhamento-gridsearch/cdk-modalidade-compartilhamento-gridsearch.module";
import {MatSelectModule} from "@angular/material/select";
import {ModalidadeCompartilhamentoService} from "../../../services/modalidade-compartilhamento.service";

@NgModule({
    declarations: [
        CdkCompartilhamentoFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        CdkSharedModule,
        CdkModalidadeCompartilhamentoAutocompleteModule,
        CdkModalidadeCompartilhamentoGridsearchModule,
        MatSelectModule,
    ],
    providers: [
        UsuarioService,
        SetorService,
        ModalidadeCompartilhamentoService
    ],
    exports: [
        CdkCompartilhamentoFormComponent
    ]
})
export class CdkCompartilhamentoFormModule {
}
