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
import {ModalidadeRepresentanteService} from '@cdk/services/modalidade-representante.service';
import {CdkModalidadeRepresentanteGridComponent} from './cdk-modalidade-representante-grid.component';
import {CdkModalidadeRepresentanteAutocompleteModule} from '@cdk/components/modalidade-representante/cdk-modalidade-representante-autocomplete/cdk-modalidade-representante-autocomplete.module';
import {CdkModalidadeRepresentanteGridFilterModule} from '../sidebars/cdk-modalidade-representante-grid-filter/cdk-modalidade-representante-grid-filter.module';
import {CdkModalidadeRepresentanteMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeRepresentanteGridComponent,
        CdkModalidadeRepresentanteMainSidebarComponent,
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

        CdkModalidadeRepresentanteAutocompleteModule,
        CdkModalidadeRepresentanteGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeRepresentanteService,
    ],
    exports: [
        CdkModalidadeRepresentanteGridComponent
    ]
})
export class CdkModalidadeRepresentanteGridModule {
}
