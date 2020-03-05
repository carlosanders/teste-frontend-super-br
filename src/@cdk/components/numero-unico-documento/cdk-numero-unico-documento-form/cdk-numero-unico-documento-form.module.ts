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
import { CdkNumeroUnicoDocumentoFormComponent } from './cdk-numero-unico-documento-form.component';
import {CdkSetorGridsearchModule} from "@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module";
import {CdkSetorAutocompleteModule} from "@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module";
import {CdkTipoDocumentoGridsearchModule} from "@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module";
import {CdkTipoDocumentoAutocompleteModule} from "@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module";

@NgModule({
    declarations: [
        CdkNumeroUnicoDocumentoFormComponent,
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

        FuseSharedModule,
        CdkSetorGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkTipoDocumentoGridsearchModule,
        CdkTipoDocumentoAutocompleteModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkNumeroUnicoDocumentoFormComponent
    ]
})
export class CdkNumeroUnicoDocumentoFormModule {
}
