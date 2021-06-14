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
import {EspecieDocumentoService} from '@cdk/services/especie-documento.service';
import {CdkEspecieDocumentoGridComponent} from './cdk-especie-documento-grid.component';
import {CdkEspecieDocumentoAutocompleteModule} from '@cdk/components/especie-documento/cdk-especie-documento-autocomplete/cdk-especie-documento-autocomplete.module';
import {CdkEspecieDocumentoFilterModule} from '@cdk/components/especie-documento/sidebars/cdk-especie-documento-filter/cdk-especie-documento-filter.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoGridComponent,
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

        CdkEspecieDocumentoFilterModule,
        CdkEspecieDocumentoAutocompleteModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        EspecieDocumentoService,
    ],
    exports: [
        CdkEspecieDocumentoGridComponent
    ]
})
export class CdkEspecieDocumentoGridModule {
}
