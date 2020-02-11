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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {GarantiaAdministrativoService} from '@cdk/services/garantia-administrativo.service';
import {CdkGarantiaAdministrativoGridComponent} from './cdk-garantia-administrativo-grid.component';
import {CdkGarantiaAdministrativoAutocompleteModule} from '@cdk/components/garantia-administrativo/cdk-garantia-administrativo-autocomplete/cdk-garantia-administrativo-autocomplete.module';
import {CdkGarantiaAdministrativoGridFilterModule} from './cdk-garantia-administrativo-grid-filter/cdk-garantia-administrativo-grid-filter.module';
import {CdkGarantiaAdministrativoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGarantiaAdministrativoGridComponent,
        CdkGarantiaAdministrativoMainSidebarComponent
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

        CdkGarantiaAdministrativoAutocompleteModule,
        CdkGarantiaAdministrativoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        GarantiaAdministrativoService,
    ],
    exports: [
        CdkGarantiaAdministrativoGridComponent
    ]
})
export class CdkGarantiaAdministrativoGridModule {
}
