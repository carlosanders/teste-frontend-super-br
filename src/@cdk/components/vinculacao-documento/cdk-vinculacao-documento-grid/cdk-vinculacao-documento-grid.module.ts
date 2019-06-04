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
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoGridComponent} from './cdk-vinculacao-documento-grid.component';
import {CdkVinculacaoDocumentoAutocompleteModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-autocomplete/cdk-vinculacao-documento-autocomplete.module';
import {CdkVinculacaoDocumentoGridFilterModule} from './cdk-vinculacao-documento-grid-filter/cdk-vinculacao-documento-grid-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoGridComponent
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
        CdkVinculacaoDocumentoAutocompleteModule,
        FuseSharedModule,
        CdkVinculacaoDocumentoGridFilterModule
    ],
    providers: [
        VinculacaoDocumentoService,
    ],
    exports: [
        CdkVinculacaoDocumentoGridComponent
    ]
})
export class CdkVinculacaoDocumentoGridModule {
}
