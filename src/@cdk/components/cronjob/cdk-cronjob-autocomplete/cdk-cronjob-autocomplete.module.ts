import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CronjobService} from '@cdk/services/cronjob.service';
import {CdkCronjobAutocompleteComponent} from './cdk-cronjob-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCronjobAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        CronjobService,
    ],
    exports: [
        CdkCronjobAutocompleteComponent
    ]
})
export class CdkCronjobAutocompleteModule {
}
