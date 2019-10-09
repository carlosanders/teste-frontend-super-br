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
import {EspecieDocumentoService} from '@cdk/services/especie-documento.service';
import {CdkEspecieDocumentoGridComponent} from './cdk-especie-documento-grid.component';
import {CdkEspecieDocumentoAutocompleteModule} from '@cdk/components/especie-documento/cdk-especie-documento-autocomplete/cdk-especie-documento-autocomplete.module';
import {CdkEspecieDocumentoGridFilterModule} from '@cdk/components/especie-documento/cdk-especie-documento-grid/cdk-especie-documento-grid-filter/cdk-especie-documento-grid-filter.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoGridComponent
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

        CdkEspecieDocumentoGridFilterModule,
        CdkEspecieDocumentoAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieDocumentoService,
    ],
    exports: [
        CdkEspecieDocumentoGridComponent
    ]
})
export class CdkEspecieDocumentoGridModule {
}
