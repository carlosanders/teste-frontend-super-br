import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TipoDocumentoService } from '@cdk/services/tipo-documento.service';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkDocumentoGridFilterComponent} from './cdk-documento-grid-filter.component';

@NgModule({
    declarations: [
        CdkDocumentoGridFilterComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkTipoDocumentoAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        TipoDocumentoService,
    ],
    exports: [
        CdkDocumentoGridFilterComponent
    ]
})
export class CdkDocumentoGridFilterModule {
}
