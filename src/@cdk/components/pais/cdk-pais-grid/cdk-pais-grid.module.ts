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
import { CdkPaisGridFilterComponent } from './cdk-pais-grid-filter/cdk-pais-grid-filter.component';
import { CdkPaisAutocompleteModule } from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';

@NgModule({
    declarations: [
        CdkPaisGridComponent,
        CdkPaisGridFilterComponent
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
