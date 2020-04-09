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
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoGridComponent} from './cdk-vinculacao-documento-grid.component';
import {CdkVinculacaoDocumentoAutocompleteModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-autocomplete/cdk-vinculacao-documento-autocomplete.module';
import {CdkVinculacaoDocumentoGridFilterModule} from '../sidebars/cdk-vinculacao-documento-grid-filter/cdk-vinculacao-documento-grid-filter.module';
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
