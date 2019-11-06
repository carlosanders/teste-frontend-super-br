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
    MatSelectModule, MatTooltipModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkDocumentoGridComponent} from './cdk-documento-grid.component';
import {CdkDocumentoGridFilterModule} from './cdk-documento-grid-filter/cdk-documento-grid-filter.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkDocumentoMainSidebarComponent} from './sidebars/main/main.component';
import {FuseSidebarModule} from '@fuse/components';

@NgModule({
    declarations: [
        CdkDocumentoGridComponent,
        CdkDocumentoMainSidebarComponent,
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

        CdkTipoDocumentoAutocompleteModule,
        CdkDocumentoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TipoDocumentoService,
        ComponenteDigitalService
    ],
    exports: [
        CdkDocumentoGridComponent
    ]
})
export class CdkDocumentoGridModule {
}
