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
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {CdkGeneroDocumentoAvulsoGridComponent} from './cdk-genero-documento-avulso-grid.component';
import {CdkGeneroDocumentoAvulsoAutocompleteModule} from '@cdk/components/genero-documento-avulso/cdk-genero-documento-avulso-autocomplete/cdk-genero-documento-avulso-autocomplete.module';
import {CdkGeneroDocumentoAvulsoGridFilterModule} from './cdk-genero-documento-avulso-grid-filter/cdk-genero-documento-avulso-grid-filter.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAvulsoGridComponent
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
        CdkGeneroDocumentoAvulsoAutocompleteModule,
        FuseSharedModule,
        CdkGeneroDocumentoAvulsoGridFilterModule
    ],
    providers: [
        GeneroDocumentoAvulsoService,
    ],
    exports: [
        CdkGeneroDocumentoAvulsoGridComponent
    ]
})
export class CdkGeneroDocumentoAvulsoGridModule {
}
