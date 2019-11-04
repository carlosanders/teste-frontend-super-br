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
import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeGridComponent} from './cdk-volume-grid.component';
import {CdkVolumeAutocompleteModule} from '@cdk/components/volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {CdkVolumeGridFilterModule} from './cdk-volume-grid-filter/cdk-volume-grid-filter.module';
import {CdkVolumeMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVolumeGridComponent,
        CdkVolumeMainSidebarComponent,
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

        CdkVolumeAutocompleteModule,
        CdkVolumeGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        VolumeService,
    ],
    exports: [
        CdkVolumeGridComponent
    ]
})
export class CdkVolumeGridModule {
}
