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
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaGridComponent} from './cdk-vinculacao-etiqueta-grid.component';
import {CdkVinculacaoEtiquetaAutocompleteModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-autocomplete/cdk-vinculacao-etiqueta-autocomplete.module';
import {CdkVinculacaoEtiquetaFilterModule} from '../sidebars/cdk-vinculacao-etiqueta-filter/cdk-vinculacao-etiqueta-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaGridComponent,
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

        CdkVinculacaoEtiquetaAutocompleteModule,
        CdkVinculacaoEtiquetaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoEtiquetaService,
    ],
    exports: [
        CdkVinculacaoEtiquetaGridComponent
    ]
})
export class CdkVinculacaoEtiquetaGridModule {
}
