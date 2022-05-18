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
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorAutocompleteModule} from "../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module";
import {CdkSetorGridsearchModule} from "../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module";
import {CdkGrupoContatoAutocompleteModule} from "../../grupo-contato/cdk-grupo-contato-autocomplete/cdk-grupo-contato-autocomplete.module";
import {CdkGrupoContatoGridsearchModule} from "../../grupo-contato/cdk-grupo-contato-autocomplete/cdk-grupo-contato-gridsearch/cdk-grupo-contato-gridsearch.module";
import {GrupoContatoService} from "../../../services/grupo-contato.service";

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

        CdkSharedModule,
        MatCardModule,
        MatRadioModule,

        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        CdkGrupoContatoAutocompleteModule,
        CdkGrupoContatoGridsearchModule,
    ],
    providers: [
        UsuarioService,
        SetorService,
        GrupoContatoService
    ],
    exports: [
        CdkCompartilhamentoFormComponent
    ]
})
export class CdkCompartilhamentoFormModule {
}
