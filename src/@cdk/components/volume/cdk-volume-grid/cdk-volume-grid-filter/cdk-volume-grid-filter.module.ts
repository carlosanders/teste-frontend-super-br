import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeGridFilterComponent} from './cdk-volume-grid-filter.component';

@NgModule({
    declarations: [
        CdkVolumeGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        VolumeService,
    ],
    exports: [
        CdkVolumeGridFilterComponent
    ]
})
export class CdkVolumeGridFilterModule {
}
