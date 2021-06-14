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
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {CdkModalidadeEtiquetaGridComponent} from './cdk-modalidade-etiqueta-grid.component';
import {CdkModalidadeEtiquetaAutocompleteModule} from '@cdk/components/modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';
import {CdkModalidadeEtiquetaFilterModule} from '../sidebars/cdk-modalidade-etiqueta-filter/cdk-modalidade-etiqueta-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaGridComponent,
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

        CdkModalidadeEtiquetaAutocompleteModule,
        CdkModalidadeEtiquetaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeEtiquetaService,
    ],
    exports: [
        CdkModalidadeEtiquetaGridComponent
    ]
})
export class CdkModalidadeEtiquetaGridModule {
}
