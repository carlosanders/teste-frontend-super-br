import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkNumeroUnicoDocumentoFormComponent} from './cdk-numero-unico-documento-form.component';
import {CdkTipoDocumentoGridsearchModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';

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

        CdkSharedModule,
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
