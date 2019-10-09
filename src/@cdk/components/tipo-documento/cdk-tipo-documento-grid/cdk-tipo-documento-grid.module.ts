import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TipoDocumentoService } from '@cdk/services/tipo-documento.service';
import { CdkTipoDocumentoGridComponent} from './cdk-tipo-documento-grid.component';
import { CdkTipoDocumentoAutocompleteModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkTipoDocumentoGridFilterModule} from './cdk-tipo-documento-grid-filter/cdk-tipo-documento-grid-filter.module';

@NgModule({
    declarations: [
        CdkTipoDocumentoGridComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkTipoDocumentoAutocompleteModule,
        CdkTipoDocumentoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        TipoDocumentoService,
    ],
    exports: [
        CdkTipoDocumentoGridComponent
    ]
})
export class CdkTipoDocumentoGridModule {
}
