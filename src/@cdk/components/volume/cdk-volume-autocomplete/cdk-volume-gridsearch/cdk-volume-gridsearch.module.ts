import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeGridsearchComponent} from './cdk-volume-gridsearch.component';
import {CdkVolumeGridModule} from '@cdk/components/volume/cdk-volume-grid/cdk-volume-grid.module';

@NgModule({
    declarations: [
        CdkVolumeGridsearchComponent
    ],
    imports: [

        CdkVolumeGridModule,

        CdkSharedModule,
    ],
    providers: [
        VolumeService
    ],
    exports: [
        CdkVolumeGridsearchComponent
    ]
})
export class CdkVolumeGridsearchModule {
}
