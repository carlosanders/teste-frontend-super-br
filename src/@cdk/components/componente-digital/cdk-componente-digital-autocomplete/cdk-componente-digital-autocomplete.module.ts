import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
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
        ComponenteDigitalService,
    ],
    exports: [
        CdkComponenteDigitalAutocompleteComponent
    ]
})
export class CdkComponenteDigitalAutocompleteModule {
}
