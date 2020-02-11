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
    MatTooltipModule,
    MatSelectModule,
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {GarantiaAdministrativoService} from '@cdk/services/garantia-administrativo.service';
import {CdkGarantiaAdministrativoAutocompleteModule} from '@cdk/components/garantia-administrativo/cdk-garantia-administrativo-autocomplete/cdk-garantia-administrativo-autocomplete.module';
import {CdkGarantiaGridComponent} from './cdk-garantia-grid.component';
import {CdkGarantiaGridFilterModule} from './cdk-garantia-grid-filter/cdk-garantia-grid-filter.module';
import {CdkGarantiaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGarantiaGridComponent,
        CdkGarantiaMainSidebarComponent,
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
        MatTooltipModule,

        CdkGarantiaAdministrativoAutocompleteModule,
        CdkGarantiaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        GarantiaAdministrativoService,
    ],
    exports: [
        CdkGarantiaGridComponent
    ]
})
export class CdkGarantiaGridModule {
}
