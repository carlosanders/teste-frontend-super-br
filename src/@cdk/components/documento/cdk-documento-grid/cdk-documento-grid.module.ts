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
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkDocumentoGridComponent} from './cdk-documento-grid.component';
import {CdkDocumentoFilterModule} from '../sidebars/cdk-documento-filter/cdk-documento-filter.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkSidebarModule} from '@cdk/components/index';

@NgModule({
    declarations: [
        CdkDocumentoGridComponent,
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
        CdkDocumentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
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
