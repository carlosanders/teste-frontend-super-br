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
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridComponent} from './cdk-sigilo-grid.component';
import {CdkSigiloAutocompleteModule} from '@cdk/components/sigilo/cdk-sigilo-autocomplete/cdk-sigilo-autocomplete.module';
import {CdkSigiloGridFilterModule} from './cdk-sigilo-grid-filter/cdk-sigilo-grid-filter.module';
import {CdkSigiloMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkSigiloGridComponent,
        CdkSigiloMainSidebarComponent,
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

        CdkSigiloAutocompleteModule,
        CdkSigiloGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloGridComponent
    ]
})
export class CdkSigiloGridModule {
}
