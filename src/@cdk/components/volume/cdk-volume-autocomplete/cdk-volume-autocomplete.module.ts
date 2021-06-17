import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeAutocompleteComponent} from './cdk-volume-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVolumeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
