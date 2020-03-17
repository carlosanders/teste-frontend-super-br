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
import {CdkDocumentoAvulsoGridFilterModule} from './cdk-documento-avulso-grid-filter/cdk-documento-avulso-grid-filter.module';
import {CdkDocumentoAvulsoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoGridComponent,
        CdkDocumentoAvulsoMainSidebarComponent,
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
        CdkDocumentoAvulsoGridFilterModule,
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
