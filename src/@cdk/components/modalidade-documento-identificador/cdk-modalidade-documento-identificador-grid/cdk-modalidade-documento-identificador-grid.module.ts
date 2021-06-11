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
import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {CdkModalidadeDocumentoIdentificadorGridComponent} from './cdk-modalidade-documento-identificador-grid.component';
import {CdkModalidadeDocumentoIdentificadorAutocompleteModule} from '@cdk/components/modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-autocomplete.module';
import {CdkModalidadeDocumentoIdentificadorFilterModule} from '../sidebars/cdk-modalidade-documento-identificador-filter/cdk-modalidade-documento-identificador-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridComponent,
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

        CdkModalidadeDocumentoIdentificadorAutocompleteModule,
        CdkModalidadeDocumentoIdentificadorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeDocumentoIdentificadorService,
    ],
    exports: [
        CdkModalidadeDocumentoIdentificadorGridComponent
    ]
})
export class CdkModalidadeDocumentoIdentificadorGridModule {
}
