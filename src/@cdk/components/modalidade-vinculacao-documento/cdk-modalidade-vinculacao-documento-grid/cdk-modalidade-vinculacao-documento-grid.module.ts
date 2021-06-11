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
import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';
import {CdkModalidadeVinculacaoDocumentoGridComponent} from './cdk-modalidade-vinculacao-documento-grid.component';
import {CdkModalidadeVinculacaoDocumentoAutocompleteModule} from '@cdk/components/modalidade-vinculacao-documento/cdk-modalidade-vinculacao-documento-autocomplete/cdk-modalidade-vinculacao-documento-autocomplete.module';
import {CdkModalidadeVinculacaoDocumentoFilterModule} from '../sidebars/cdk-modalidade-vinculacao-documento-filter/cdk-modalidade-vinculacao-documento-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoDocumentoGridComponent,
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

        CdkModalidadeVinculacaoDocumentoFilterModule,
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
