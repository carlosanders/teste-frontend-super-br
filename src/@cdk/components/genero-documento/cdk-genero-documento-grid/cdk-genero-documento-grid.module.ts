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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {CdkGeneroDocumentoGridComponent} from './cdk-genero-documento-grid.component';
import {CdkGeneroDocumentoAutocompleteModule} from '@cdk/components/genero-documento/cdk-genero-documento-autocomplete/cdk-genero-documento-autocomplete.module';
import {CdkGeneroDocumentoGridFilterModule} from './cdk-genero-documento-grid-filter/cdk-genero-documento-grid-filter.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoGridComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkGeneroDocumentoAutocompleteModule,
        FuseSharedModule,
        CdkGeneroDocumentoGridFilterModule
    ],
    providers: [
        GeneroDocumentoService,
    ],
    exports: [
        CdkGeneroDocumentoGridComponent
    ]
})
export class CdkGeneroDocumentoGridModule {
}
