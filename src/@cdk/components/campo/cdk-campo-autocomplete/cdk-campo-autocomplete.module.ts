import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CampoService} from '@cdk/services/campo.service';
import {CdkCampoAutocompleteComponent} from './cdk-campo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCampoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        CampoService,
    ],
    exports: [
        CdkCampoAutocompleteComponent
    ]
})
export class CdkCampoAutocompleteModule {
}
