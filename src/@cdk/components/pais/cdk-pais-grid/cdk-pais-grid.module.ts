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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { PaisService } from '@cdk/services/pais.service';
import { CdkPaisGridComponent} from './cdk-pais-grid.component';
import { CdkPaisAutocompleteModule } from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkPaisGridFilterModule} from './cdk-pais-grid-filter/cdk-pais-grid-filter.module';

@NgModule({
    declarations: [
        CdkPaisGridComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkPaisAutocompleteModule,
        CdkPaisGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        PaisService,
    ],
    exports: [
        CdkPaisGridComponent
    ]
})
export class CdkPaisGridModule {
}
