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
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoGridComponent} from './cdk-documento-avulso-grid.component';
import {CdkDocumentoAvulsoAutocompleteModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkDocumentoAvulsoFilterModule} from '../sidebars/cdk-documento-avulso-filter/cdk-documento-avulso-filter.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoGridComponent,
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
        MatTooltipModule,

        CdkSharedModule,
        CdkSidebarModule,

        CdkDocumentoAvulsoAutocompleteModule,
        CdkDocumentoAvulsoFilterModule,
    ],
    providers: [
        DocumentoAvulsoService
    ],
    exports: [
        CdkDocumentoAvulsoGridComponent
    ]
})
export class CdkDocumentoAvulsoGridModule {
}
