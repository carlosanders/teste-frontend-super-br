import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {NavioService} from '../../../services/navio.service';
import {CdkNavioAutocompleteComponent} from './cdk-navio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkNavioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        NavioService,
    ],
    exports: [
        CdkNavioAutocompleteComponent
    ]
})
export class CdkNavioAutocompleteModule {
}
