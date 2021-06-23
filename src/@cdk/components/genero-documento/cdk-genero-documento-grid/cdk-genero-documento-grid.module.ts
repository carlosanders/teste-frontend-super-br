import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {CdkGeneroDocumentoGridComponent} from './cdk-genero-documento-grid.component';
import {CdkGeneroDocumentoAutocompleteModule} from '@cdk/components/genero-documento/cdk-genero-documento-autocomplete/cdk-genero-documento-autocomplete.module';
import {CdkGeneroDocumentoFilterModule} from '../sidebars/cdk-genero-documento-filter/cdk-genero-documento-filter.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoGridComponent,
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
        CdkGeneroDocumentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
