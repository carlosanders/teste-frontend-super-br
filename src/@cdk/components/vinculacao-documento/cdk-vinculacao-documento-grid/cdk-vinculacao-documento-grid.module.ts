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
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoGridComponent} from './cdk-vinculacao-documento-grid.component';
import {CdkVinculacaoDocumentoAutocompleteModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-autocomplete/cdk-vinculacao-documento-autocomplete.module';
import {CdkVinculacaoDocumentoFilterModule} from '../sidebars/cdk-vinculacao-documento-filter/cdk-vinculacao-documento-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoGridComponent,
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
        CdkVinculacaoDocumentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
