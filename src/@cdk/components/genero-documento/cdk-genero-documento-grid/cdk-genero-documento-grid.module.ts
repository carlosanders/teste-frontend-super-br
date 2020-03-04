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
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {CdkGeneroDocumentoGridComponent} from './cdk-genero-documento-grid.component';
import {CdkGeneroDocumentoAutocompleteModule} from '@cdk/components/genero-documento/cdk-genero-documento-autocomplete/cdk-genero-documento-autocomplete.module';
import {CdkGeneroDocumentoGridFilterModule} from './cdk-genero-documento-grid-filter/cdk-genero-documento-grid-filter.module';
import {CdkGeneroDocumentoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGeneroDocumentoGridComponent,
        CdkGeneroDocumentoMainSidebarComponent,
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

        CdkGeneroDocumentoAutocompleteModule,
        CdkGeneroDocumentoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
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
