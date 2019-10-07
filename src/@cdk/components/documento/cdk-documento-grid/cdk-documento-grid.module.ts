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

import {FuseSharedModule} from '@fuse/shared.module';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkDocumentoGridComponent} from './cdk-documento-grid.component';
import {CdkDocumentoGridFilterModule} from './cdk-documento-grid-filter/cdk-documento-grid-filter.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@NgModule({
    declarations: [
        CdkDocumentoGridComponent
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
        CdkDocumentoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        TipoDocumentoService,
        ComponenteDigitalService
    ],
    exports: [
        CdkDocumentoGridComponent
    ]
})
export class CdkDocumentoGridModule {
}
