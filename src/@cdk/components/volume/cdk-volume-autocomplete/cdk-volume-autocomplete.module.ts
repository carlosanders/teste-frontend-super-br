import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeAutocompleteComponent} from './cdk-volume-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVolumeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        VolumeService,
    ],
    exports: [
        CdkVolumeAutocompleteComponent
    ]
})
export class CdkVolumeAutocompleteModule {
}
