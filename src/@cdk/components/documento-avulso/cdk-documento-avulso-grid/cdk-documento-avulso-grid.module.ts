import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatTooltipModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoGridComponent} from './cdk-documento-avulso-grid.component';
import {CdkDocumentoAvulsoAutocompleteModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkDocumentoAvulsoGridFilterModule} from './cdk-documento-avulso-grid-filter/cdk-documento-avulso-grid-filter.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoGridComponent
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
        CdkDocumentoAvulsoAutocompleteModule,
        FuseSharedModule,
        CdkDocumentoAvulsoGridFilterModule,
        MatTooltipModule
    ],
    providers: [
        DocumentoAvulsoService,
    ],
    exports: [
        CdkDocumentoAvulsoGridComponent
    ]
})
export class CdkDocumentoAvulsoGridModule {
}
