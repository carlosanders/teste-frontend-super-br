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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {CdkModalidadeDocumentoIdentificadorGridComponent} from './cdk-modalidade-documento-identificador-grid.component';
import {CdkModalidadeDocumentoIdentificadorAutocompleteModule} from '@cdk/components/modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-autocomplete.module';
import {CdkModalidadeDocumentoIdentificadorGridFilterModule} from './cdk-modalidade-documento-identificador-grid-filter/cdk-modalidade-documento-identificador-grid-filter.module';
import {CdkModalidadeDocumentoIdentificadorMainSidebarComponent} from './sidebars/main/sidebars/main/main.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridComponent,
        CdkModalidadeDocumentoIdentificadorMainSidebarComponent,
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
        CdkModalidadeDocumentoIdentificadorGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
