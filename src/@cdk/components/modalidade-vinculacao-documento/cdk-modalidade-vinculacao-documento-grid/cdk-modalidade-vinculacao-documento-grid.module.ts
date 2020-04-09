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
import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';
import {CdkModalidadeVinculacaoDocumentoGridComponent} from './cdk-modalidade-vinculacao-documento-grid.component';
import {CdkModalidadeVinculacaoDocumentoAutocompleteModule} from '@cdk/components/modalidade-vinculacao-documento/cdk-modalidade-vinculacao-documento-autocomplete/cdk-modalidade-vinculacao-documento-autocomplete.module';
import {CdkModalidadeVinculacaoDocumentoGridFilterModule} from '../sidebars/cdk-modalidade-vinculacao-documento-grid-filter/cdk-modalidade-vinculacao-documento-grid-filter.module';
import {CdkModalidadeVinculacaoDocumentoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoDocumentoGridComponent,
        CdkModalidadeVinculacaoDocumentoMainSidebarComponent,
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

        CdkModalidadeVinculacaoDocumentoGridFilterModule,
        CdkModalidadeVinculacaoDocumentoAutocompleteModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeVinculacaoDocumentoService,
    ],
    exports: [
        CdkModalidadeVinculacaoDocumentoGridComponent
    ]
})
export class CdkModalidadeVinculacaoDocumentoGridModule {
}
