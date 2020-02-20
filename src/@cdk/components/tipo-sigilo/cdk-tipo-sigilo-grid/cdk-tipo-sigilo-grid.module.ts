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
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloGridComponent} from './cdk-tipo-sigilo-grid.component';
import {CdkTipoSigiloAutocompleteModule} from '@cdk/components/tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';
import {CdkTipoSigiloGridFilterModule} from './cdk-tipo-sigilo-grid-filter/cdk-tipo-sigilo-grid-filter.module';
import {CdkTipoSigiloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkTipoSigiloGridComponent,
        CdkTipoSigiloMainSidebarComponent,
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

        CdkTipoSigiloAutocompleteModule,
        CdkTipoSigiloGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TipoSigiloService,
    ],
    exports: [
        CdkTipoSigiloGridComponent
    ]
})
export class CdkTipoSigiloGridModule {
}
