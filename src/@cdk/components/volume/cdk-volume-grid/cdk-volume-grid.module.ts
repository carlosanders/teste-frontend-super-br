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

import {FuseSharedModule} from '@fuse/shared.module';
import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeGridComponent} from './cdk-volume-grid.component';
import {CdkVolumeAutocompleteModule} from '@cdk/components/volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {CdkVolumeGridFilterModule} from './cdk-volume-grid-filter/cdk-volume-grid-filter.module';

@NgModule({
    declarations: [
        CdkVolumeGridComponent
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
        CdkVolumeAutocompleteModule,
        FuseSharedModule,
        CdkVolumeGridFilterModule
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
