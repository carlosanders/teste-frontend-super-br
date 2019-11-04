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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoGridComponent} from './cdk-vinculacao-documento-grid.component';
import {CdkVinculacaoDocumentoAutocompleteModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-autocomplete/cdk-vinculacao-documento-autocomplete.module';
import {CdkVinculacaoDocumentoGridFilterModule} from './cdk-vinculacao-documento-grid-filter/cdk-vinculacao-documento-grid-filter.module';
import {CdkVinculacaoDocumentoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoGridComponent,
        CdkVinculacaoDocumentoMainSidebarComponent,
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

        CdkVinculacaoDocumentoAutocompleteModule,
        CdkVinculacaoDocumentoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
