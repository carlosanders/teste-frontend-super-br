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
import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteGridComponent} from './cdk-representante-grid.component';
import {CdkRepresentanteAutocompleteModule} from '@cdk/components/representante/cdk-representante-autocomplete/cdk-representante-autocomplete.module';
import {CdkRepresentanteFilterModule} from '../sidebars/cdk-representante-filter/cdk-representante-filter.module';

@NgModule({
    declarations: [
        CdkRepresentanteGridComponent,
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

        CdkRepresentanteAutocompleteModule,
        CdkRepresentanteFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        RepresentanteService,
    ],
    exports: [
        CdkRepresentanteGridComponent
    ]
})
export class CdkRepresentanteGridModule {
}
