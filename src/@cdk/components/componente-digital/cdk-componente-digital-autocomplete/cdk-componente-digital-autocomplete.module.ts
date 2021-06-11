import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalAutocompleteComponent} from './cdk-componente-digital-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalAutocompleteComponent
    ]
})
export class CdkComponenteDigitalAutocompleteModule {
}
