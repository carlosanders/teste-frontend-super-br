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
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {CdkModalidadeEtiquetaGridComponent} from './cdk-modalidade-etiqueta-grid.component';
import {CdkModalidadeEtiquetaAutocompleteModule} from '@cdk/components/modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';
import {CdkModalidadeEtiquetaGridFilterModule} from '../sidebars/cdk-modalidade-etiqueta-grid-filter/cdk-modalidade-etiqueta-grid-filter.module';
import {CdkModalidadeEtiquetaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaGridComponent,
        CdkModalidadeEtiquetaMainSidebarComponent,
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
        CdkModalidadeEtiquetaGridFilterModule,

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
