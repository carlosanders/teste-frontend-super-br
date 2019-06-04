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

import { FuseSharedModule } from '@fuse/shared.module';
import { TipoDocumentoService } from '@cdk/services/tipo-documento.service';
import { CdkTipoDocumentoGridComponent} from './cdk-tipo-documento-grid.component';
import { CdkTipoDocumentoGridFilterComponent } from './cdk-tipo-documento-grid-filter/cdk-tipo-documento-grid-filter.component';
import { CdkTipoDocumentoAutocompleteModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkTipoDocumentoGridComponent,
        CdkTipoDocumentoGridFilterComponent
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

        CdkTipoDocumentoAutocompleteModule,

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
