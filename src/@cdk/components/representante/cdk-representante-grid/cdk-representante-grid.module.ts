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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteGridComponent} from './cdk-representante-grid.component';
import {CdkRepresentanteAutocompleteModule} from '@cdk/components/representante/cdk-representante-autocomplete/cdk-representante-autocomplete.module';
import {CdkRepresentanteGridFilterModule} from './cdk-representante-grid-filter/cdk-representante-grid-filter.module';

@NgModule({
    declarations: [
        CdkRepresentanteGridComponent
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
        CdkRepresentanteGridFilterModule,

        FuseSharedModule,
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
