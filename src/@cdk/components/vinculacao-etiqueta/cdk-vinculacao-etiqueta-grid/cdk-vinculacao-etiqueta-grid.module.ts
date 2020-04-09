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
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaGridComponent} from './cdk-vinculacao-etiqueta-grid.component';
import {CdkVinculacaoEtiquetaAutocompleteModule} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-autocomplete/cdk-vinculacao-etiqueta-autocomplete.module';
import {CdkVinculacaoEtiquetaGridFilterModule} from '../sidebars/cdk-vinculacao-etiqueta-grid-filter/cdk-vinculacao-etiqueta-grid-filter.module';
import {CdkVinculacaoEtiquetaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaGridComponent,
        CdkVinculacaoEtiquetaMainSidebarComponent,
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
        CdkVinculacaoEtiquetaGridFilterModule,

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
