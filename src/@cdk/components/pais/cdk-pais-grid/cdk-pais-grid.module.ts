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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {PaisService} from '@cdk/services/pais.service';
import {CdkPaisGridComponent} from './cdk-pais-grid.component';
import {CdkPaisAutocompleteModule} from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkPaisGridFilterModule} from './cdk-pais-grid-filter/cdk-pais-grid-filter.module';
import {CdkPaisMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkPaisGridComponent,
        CdkPaisMainSidebarComponent,
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

        CdkPaisAutocompleteModule,
        CdkPaisGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
