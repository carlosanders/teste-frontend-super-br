import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkLotacaoFormComponent } from './cdk-lotacao-form.component';
import { CdkUsuarioAutocompleteModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import { CdkUsuarioGridsearchModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkSetorGridsearchModule} from "../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module";
import {CdkSetorAutocompleteModule} from "../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module";

@NgModule({
    declarations: [
        CdkLotacaoFormComponent,
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

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        FuseSharedModule,
        CdkSetorGridsearchModule,
        CdkSetorAutocompleteModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkLotacaoFormComponent
    ]
})
export class CdkLotacaoFormModule {
}
