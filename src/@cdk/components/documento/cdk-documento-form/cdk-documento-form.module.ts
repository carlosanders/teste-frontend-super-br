import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TipoDocumentoService } from '@cdk/services/tipo-documento.service';
import { CdkDocumentoFormComponent } from './cdk-documento-form.component';
import { CdkTipoDocumentoAutocompleteModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import { CdkTipoDocumentoGridsearchModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';

@NgModule({
    declarations: [
        CdkDocumentoFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkTipoDocumentoAutocompleteModule,
        CdkTipoDocumentoGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        TipoDocumentoService,
    ],
    exports: [
        CdkDocumentoFormComponent
    ]
})
export class CdkDocumentoFormModule {
}
