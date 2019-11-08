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
import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkMunicipioGridComponent} from './cdk-municipio-grid.component';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridFilterModule} from './cdk-municipio-grid-filter/cdk-municipio-grid-filter.module';
import {CdkMunicipioMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkMunicipioGridComponent,
        CdkMunicipioMainSidebarComponent,
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

        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkMunicipioGridComponent
    ]
})
export class CdkMunicipioGridModule {
}
